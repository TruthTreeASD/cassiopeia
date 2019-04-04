import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownToggle
} from 'reactstrap';
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

const renderSuggestion = (suggestion, clickable) => {
  if (clickable === false) {
    return (
      <DropdownItem
        className="text-secondary"
        onClick={() => console.log(suggestion)}
      >
        {getSuggestionLabel(suggestion)}
      </DropdownItem>
    );
  } else {
    return (
      <Link className="text-secondary" to={getSuggestionUrl(suggestion)}>
        {getSuggestionLabel(suggestion)}
      </Link>
    );
  }
};

class LocationSearchBox extends Component {
  constructor(props) {
    super(props);
    this.debouncedhandleSuggestionsFetchRequested = debounce(
      this.handleSuggestionsFetchRequested,
      250
    );
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      selectedLocation: null
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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
    const { value, suggestions, dispatch, clickable } = this.props;
    const inputProps = {
      value,
      onChange: this.handleInputChange
    };

    if (clickable === false) {
      return (
        <Dropdown
          lg="2"
          sm="12"
          md="2"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle className="DT" caret>
            Select a location....
          </DropdownToggle>
          <DropdownMenu className="DM">
            <Autosuggest
              theme={{
                container: searchBoxStyle,
                suggestionsList:
                  'list-group position-absolute w-100 overflow-y',
                suggestion: 'list-group-item'
              }}
              suggestions={suggestions}
              onSuggestionsFetchRequested={
                this.debouncedhandleSuggestionsFetchRequested
              }
              onSuggestionSelected={() => dispatch(updateValue(value))}
              getSuggestionValue={getSuggestionLabel}
              renderInputComponent={this.renderInputComponent}
              renderSuggestion={suggestion =>
                renderSuggestion(suggestion, clickable)
              }
              inputProps={inputProps}
            />
          </DropdownMenu>
        </Dropdown>
      );
    } else {
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
          getSuggestionValue={getSuggestionLabel}
          renderInputComponent={this.renderInputComponent}
          renderSuggestion={suggestion =>
            renderSuggestion(suggestion, clickable)
          }
          inputProps={inputProps}
        />
      );
    }
  }
}

const mapStateToProps = store => ({
  value: store.LocationSearchBoxReducer.value,
  suggestions: store.LocationSearchBoxReducer.suggestions,
  loading: store.LocationSearchBoxReducer.loading
});

export default connect(mapStateToProps)(withRouter(LocationSearchBox));
