import React, { Component } from 'react';

import '../../styles/Header.css';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
import axios from 'axios/index';
import { connect } from 'react-redux';
import Select from 'react-select';

import { TRUTHTREE_URI } from '../../constants';

class CommonAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      selectedAttributes: [],
      allValues: []
    };
    this.getAttributes = this.getAttributes.bind(this);
    this.toggle = this.toggle.bind(this);
    this.addAttributes = this.addAttributes.bind(this);
    this.handleChangeAttribute = this.handleChangeAttribute.bind(this);
  }

  componentDidMount() {
    this.getAttributes();
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  addAttributes(e) {
    let selectedAttribute = {
      name: e.target.id,
      displayName: e.target.value
    };
    this.props.dispatch({
      type: 'ADD_ATTRIBUTES',
      selectedAttribute: selectedAttribute
    });
  }

  handleChangeAttribute = selectedAttributes => {
    console.log(selectedAttributes);
    this.props.dispatch({
      type: 'ADD_ATTRIBUTES',
      selectedAttribute: selectedAttributes
    });
  };

  getAttributes() {
    axios
      .get(`${TRUTHTREE_URI}/api/similarlocations/attributes`)
      .then(response => {
        this.setState({ allValues: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let values = this.state.allValues.map((value, i) => ({
      value: value.id,
      label: value.display_name
    }));
    return (
      <div id="normalisation">
        <Select
          value={this.props.selectedAttributes}
          onChange={this.handleChangeAttribute}
          options={values}
          isMulti="true"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAttributes: state.CommonAttributesReducer.selectedAttributes
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommonAttributes);
