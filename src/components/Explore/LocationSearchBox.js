import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import { post } from 'axios';
import Autosuggest from 'react-autosuggest';
import { Link, withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

import {
  updateValue,
  updateSuggestions
} from '../../actions/LocationSearchBoxActions';
import { getSuggestionLabel, getSuggestionUrl } from './common';

const ENDPOINT = '/api/search';

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
  return (
    <Link to={getSuggestionUrl(suggestion)}>
      {getSuggestionLabel(suggestion)}
    </Link>
  );
};

class LocationSearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    };
    this.debouncedhandleSuggestionsFetchRequested = debounce(
      this.handleSuggestionsFetchRequested,
      250
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.inputRef.focus();
    }
  }

  storeInputRef = searchBox => {
    if (searchBox !== null) {
      this.input = searchBox.input;
    }
  };

  handleInputChange = (_, { newValue }) => {
    this.props.dispatch(updateValue(newValue));
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    post(ENDPOINT, {
      text: value
    })
      .then(response => this.props.dispatch(updateSuggestions(response.data)))
      .catch(err => console.log(err));
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
    const { value, suggestions, dispatch } = this.props;
    const inputProps = {
      value,
      onChange: this.handleInputChange
    };

    return (
      <Container>
        <Row>
          <Col>
            <Autosuggest
              ref={this.storeInputRef}
              theme={{
                container: 'position-relative',
                suggestionsList:
                  'list-group position-absolute w-100 overflow-y',
                suggestion: 'list-group-item'
              }}
              suggestions={suggestions}
              onSuggestionsClearRequested={() =>
                this.setState({ suggestions: [] })
              }
              onSuggestionsFetchRequested={
                this.debouncedhandleSuggestionsFetchRequested
              }
              onSuggestionSelected={() => dispatch(updateValue(value))}
              getSuggestionValue={getSuggestionLabel}
              renderInputComponent={this.renderInputComponent}
              renderSuggestionsContainer={renderSuggestionsContainer}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  value: store.LocationSearchBoxReducer.value,
  suggestions: store.LocationSearchBoxReducer.suggestions,
  loading: store.LocationSearchBoxReducer.loading
});

export default connect(mapStateToProps)(withRouter(LocationSearchBox));
