import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Spinner,
  Popover,
  Input,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { get } from 'axios';
import Fuse from 'fuse.js';
import Autosuggest from 'react-autosuggest';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';

import { TRUTHTREE_URI } from '../../constants';
import { updateValue } from '../../actions/LocationSearchBoxActions';

// TruthTree API endpoints
const ENDPOINTS = {
  STATES: `${TRUTHTREE_URI}/api/states`,
  COUNTIES: `${TRUTHTREE_URI}/api/counties`,
  CITIES: `${TRUTHTREE_URI}/api/cities`
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

const PopoverSection = ({ level, items }) => {
  return (
    <ListGroup>
      <ListGroupItem>
        <strong className="text-uppercase">{level}</strong>
      </ListGroupItem>
      {items.map((item, index) => {
        item = item.item;
        let buttonText = item.name;
        if (level !== 'counties') {
          buttonText += item.county ? `, ${item.county}` : '';
        }
        buttonText += item.stateAbbr ? `, ${item.stateAbbr}` : '';
        const url = `/explore/${level}/${item.name
          .toLowerCase()
          .replace(' ', '-')}/${item.id}`;

        return (
          <ListGroupItem key={index}>
            <Link to={url}>{buttonText}</Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

const renderInputComponent = inputProps => (
  <div>
    <Label
      style={{ cursor: 'pointer', color: 'white' }}
      for="location-search-box"
    >
      Search for a U.S location:
    </Label>
    <Input
      {...inputProps}
      id="location-search-box"
      name="location-search-box"
      placeholder="Try something like Seattle or Boston"
    />
  </div>
);

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

const renderSuggestion = suggestion => {
  let item = suggestion.item;
  let buttonText = item.name;
  // if (level !== 'counties') {
  //   buttonText += item.county ? `, ${item.county}` : '';
  // }
  buttonText += item.stateAbbr ? `, ${item.stateAbbr}` : '';
  const url = `/explore/${item.name.toLowerCase().replace(' ', '-')}/${
    item.id
  }`;
  return <Link to="/">{item.name}</Link>;
};

class LocationSearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
    this.timer = null;
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

  _parseData = (statesData, countiesData, citiesData) => {
    const statesDataById = statesData.reduce((newStatesData, state) => {
      newStatesData[state.state_code] = state;
      state.counties = {};
      return newStatesData;
    }, {});

    countiesData.forEach(county => {
      const state = statesDataById[county.state_code];
      county.state = state.name;
      county.stateAbbr = state.abbreviation;
      state.counties[county.county] = county;
    });

    citiesData.forEach(city => {
      const state = statesDataById[city.state_code];
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

    this.setState({
      loading: false,
      statesData: new Fuse(statesData, statesFuseOptions),
      countiesData: new Fuse(countiesData, countiesFuseOptions),
      citiesData: new Fuse(citiesData, citiesFuseOptions)
    });
  };

  handleInputChange = (_, { newValue }) => {
    this.props.dispatch(updateValue(newValue));
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    const searchPhrase = value;
    const matchedStates = this.state.statesData.search(searchPhrase);
    const matchedCounties = this.state.countiesData.search(searchPhrase);
    const matchedCities = this.state.citiesData.search(searchPhrase);
    const temp = [].concat(
      matchedStates.slice(0, 5),
      matchedCounties.slice(0, 5),
      matchedCities.slice(0, 5)
    );
    temp.sort((a, b) => a.score - b.score);
    this.setState({
      suggestions: temp.slice(0, 10)
    });
  };

  render() {
    const { loading } = this.state;

    const inputProps = {
      value: this.props.value,
      onChange: this.handleInputChange
    };

    return (
      <Container>
        <Row className="py-3">
          {loading ? (
            <Col className="d-flex justify-content-center">
              <Spinner className="align-self-center" color="primary" />
            </Col>
          ) : (
            <Col>
              <Autosuggest
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
                getSuggestionValue={suggestion => suggestion}
                renderInputComponent={renderInputComponent}
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
  value: store.LocationSearchBoxReducer.value
});

export default connect(mapStateToProps)(withRouter(LocationSearchBox));
