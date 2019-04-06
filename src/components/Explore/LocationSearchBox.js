import React, { Component } from 'react';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
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
const searchBoxStyle = {
  zIndex: 1,
  position: 'relative'
};

const renderSuggestion = suggestion => {
  return (
    <Link className="text-secondary" to={getSuggestionUrl(suggestion)}>
      {getSuggestionLabel(suggestion)}
    </Link>
  );
};

class LocationSearchBox extends Component {
  constructor(props) {
    super(props);
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
      <InputGroup>
        <Input
          {...inputProps}
          id="location-search-box"
          name="location-search-box"
          placeholder="Try something like Seattle or Boston"
          innerRef={input => {
            this.inputRef = input;
          }}
        />
        <InputGroupAddon addonType="append">
          <label className="btn btn-light mb-0">
            <i className="fa fa-chevron-up" />
          </label>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );

  render() {
    const { value, suggestions, dispatch } = this.props;
    const inputProps = {
      value,
      onChange: this.handleInputChange
    };

    return (
      <Autosuggest
        theme={{
          container: searchBoxStyle,
          suggestionsList: 'list-group position-absolute w-100 overflow-y',
          suggestion: 'list-group-item'
        }}
        suggestions={suggestions}
        onSuggestionsFetchRequested={
          this.debouncedhandleSuggestionsFetchRequested
        }
        onSuggestionSelected={() => dispatch(updateValue(value))}
        onSuggestionsClearRequested={() => null}
        getSuggestionValue={getSuggestionLabel}
        renderInputComponent={this.renderInputComponent}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

const mapStateToProps = store => ({
  value: store.LocationSearchBoxReducer.value,
  suggestions: store.LocationSearchBoxReducer.suggestions,
  loading: store.LocationSearchBoxReducer.loading
});

export default connect(mapStateToProps)(withRouter(LocationSearchBox));
