import React, { Component } from 'react';
import {
  Input,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownToggle,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import { post } from 'axios';
import Autosuggest from 'react-autosuggest';
import { Link, withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

import {
  updateValue,
  updateSuggestions,
  selectSuggestion
} from '../../actions/LocationSearchBoxActions';
import { getSuggestionLabel, getSuggestionUrl } from './common';
import '../../styles/LocationSearchBox.css';

const ENDPOINT = '/api/search';
const searchBoxStyle = {
  zIndex: 1,
  position: 'relative'
};

const renderSuggestion = (suggestion, clickable) => {
  if (clickable === false) {
    return (
      <DropdownItem className="text-secondary">
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
      selectedLocation: null,
      displayTextValue: 'Select a location'
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

  handleSuggestionSelected = (_, { suggestion }) => {
    const { dispatch, clickable, value } = this.props;
    if (clickable === false) {
      let label = suggestion.name;
      const parent = suggestion.parent;
      label += !parent
        ? ''
        : !parent.parent
        ? `, ${parent.name}`
        : `, ${parent.name}, ${parent.parent.name}`;

      this.setState({ displayTextValue: label });
      dispatch(selectSuggestion(suggestion));
    } else {
      dispatch(updateValue(value));
    }
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
    const { value, suggestions, dispatch, clickable, selected } = this.props;
    const inputProps = {
      value,
      onChange: this.handleInputChange
    };

    if (clickable === false) {
      return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>{this.state.displayTextValue}</DropdownToggle>
          <DropdownMenu className="dropdown-width-advance">
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
              onSuggestionSelected={this.handleSuggestionSelected}
              onSuggestionsClearRequested={() => null}
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
          onSuggestionSelected={this.handleSuggestionSelected}
          onSuggestionsClearRequested={() => null}
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
  loading: store.LocationSearchBoxReducer.loading,
  selected: store.LocationSearchBoxReducer.selected
});

export default connect(mapStateToProps)(withRouter(LocationSearchBox));
