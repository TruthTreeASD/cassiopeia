import React, { Component } from 'react';
import { Container, Row, Col, Spinner, Input } from 'reactstrap';
import { get } from 'axios';
import Fuse from 'fuse.js';
import Autosuggest from 'react-autosuggest';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';

import {
  updateValue,
  finishLoading
} from '../../actions/LocationSearchBoxActions';

// TruthTree API endpoints
const ENDPOINTS = {
  STATES: `/api/states`,
  COUNTIES: `/api/counties`,
  CITIES: `/api/cities`
};

const TYPE_CODE = {
  0: 'states',
  1: 'counties',
  2: 'cities'
};

const createFuseOptions = keys => {
  return {
    threshold: 0.6,
    includeScore: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: keys
  };
};

const renderSuggestionsContainer = ({ containerProps, children }) => {
  const style = {
    height: '5em'
  };
  return (
    <div style={style} {...containerProps}>
      {children}
    </div>
  );
};

const getSuggestionLabel = suggestion => {
  let item = suggestion.item;
  let label = item.name;
  if (item.typeCode !== 1) {
    label += item.county ? `, ${item.county}` : '';
  }
  label += item.stateAbbr ? `, ${item.stateAbbr}` : '';
  return label;
};

const renderSuggestion = suggestion => {
  let item = suggestion.item;
  const url = `/explore/${
    TYPE_CODE[item.type_code]
  }/${item.name.toLowerCase().replace(' ', '-')}/${item.id}`;
  return <Link to={url}>{getSuggestionLabel(suggestion)}</Link>;
};

class LocationSearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      popoverOpen: false,
      statesData: undefined,
      countiesData: undefined,
      citiesData: undefined,
      matchedStates: [],
      matchedCounties: [],
      matchedCities: [],
      suggestions: []
    };
    this.debouncedhandleSuggestionsFetchRequested = _.debounce(
      this.handleSuggestionsFetchRequested,
      250
    );
  }

  componentDidMount() {
    const reqs = [
      get(ENDPOINTS.STATES),
      get(ENDPOINTS.COUNTIES),
      get(ENDPOINTS.CITIES)
    ];

    Promise.all(reqs)
      .then(([statesRes, countiesRes, citiesRes]) => {
        this._parseData(statesRes.data, countiesRes.data, citiesRes.data);
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.inputRef.focus();
    }
  }

  _parseData = (statesData, countiesData, citiesData) => {
    const statesDataById = statesData.reduce((newStatesData, state) => {
      newStatesData[state.state_code] = state;
      state.counties = {};
      state.type_code = 0;
      return newStatesData;
    }, {});

    countiesData.forEach(county => {
      const state = statesDataById[county.fips_code_state];
      county.state = state.name;
      county.stateAbbr = state.abbreviation;
      state.counties[county.county] = county;
    });

    citiesData.forEach(city => {
      const state = statesDataById[city.fips_code_state];
      const county = state.counties[city.county];

      if (state) {
        city.state = state.name;
        city.stateAbbr = state.abbreviation;
      } else {
        city.state = null;
        city.stateAbbr = null;
      }
      city.county = county ? county.name : null;
    });

    const statesFuseOptions = createFuseOptions([
      { name: 'abbreviation', weight: 0.3 },
      { name: 'name', weight: 0.7 }
    ]);

    const countiesFuseOptions = createFuseOptions([
      { name: 'name', weight: 0.6 },
      { name: 'state', weight: 0.3 },
      { name: 'stateAbbr', weight: 0.1 }
    ]);

    const citiesFuseOptions = createFuseOptions([
      { name: 'name', weight: 0.7 },
      { name: 'state', weight: 0.2 },
      { name: 'stateAbbr', weight: 0.05 },
      { name: 'county', weight: 0.05 }
    ]);

    this.setState(
      {
        statesData: new Fuse(statesData, statesFuseOptions),
        countiesData: new Fuse(countiesData, countiesFuseOptions),
        citiesData: new Fuse(citiesData, citiesFuseOptions)
      },
      () => {
        this.props.dispatch(finishLoading());
      }
    );
  };

  storeInputRef = searchBox => {
    if (searchBox !== null) {
      this.input = searchBox.input;
    }
  };

  handleInputChange = (_, { newValue }) => {
    this.props.dispatch(updateValue(newValue));
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    const searchPhrase = value;
    const matchedStates = this.state.statesData.search(searchPhrase);
    const matchedCounties = this.state.countiesData.search(searchPhrase);
    const matchedCities = this.state.citiesData.search(searchPhrase);
    const temp = [].concat(matchedStates, matchedCounties, matchedCities);
    temp.sort((a, b) => a.score - b.score);
    this.setState({
      suggestions: temp.slice(0, 10)
    });
  };
  renderInputComponent = inputProps => (
    <div>
      <Input
        {...inputProps}
        id="location-search-box"
        name="location-search-box"
        placeholder="Try something like Seattle or Boston"
        innerRef={input => {
          this.inputRef = input;
        }}
      />
    </div>
  );

  render() {
    const { loading, value } = this.props;

    const inputProps = {
      value,
      onChange: this.handleInputChange
    };

    return (
      <Container>
        <Row>
          {loading ? (
            <Col className="d-flex justify-content-center">
              <Spinner className="align-self-center" color="primary" />
            </Col>
          ) : (
            <Col>
              <Autosuggest
                ref={this.storeInputRef}
                theme={{
                  container: 'position-relative',
                  suggestionsList:
                    'list-group position-absolute w-100 overflow-y',
                  suggestion: 'list-group-item'
                }}
                suggestions={this.state.suggestions}
                alwaysRenderSuggestions
                onSuggestionsClearRequested={() =>
                  this.setState({ suggestions: [] })
                }
                onSuggestionsFetchRequested={
                  this.debouncedhandleSuggestionsFetchRequested
                }
                getSuggestionValue={getSuggestionLabel}
                renderInputComponent={this.renderInputComponent}
                renderSuggestionsContainer={renderSuggestionsContainer}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  value: store.LocationSearchBoxReducer.value,
  loading: store.LocationSearchBoxReducer.loading
});

export default connect(mapStateToProps)(withRouter(LocationSearchBox));
