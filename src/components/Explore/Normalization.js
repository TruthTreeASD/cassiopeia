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

import { TRUTHTREE_URI } from '../../constants';

class Normalization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      selectedNormalizationDisplayName: 'Gross',
      selectedNormalizationName: 'GROSS',
      normalizationValues: []
    };
    this.normalizationValuesCall = this.normalizationValuesCall.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setSelectedNormalization = this.setSelectedNormalization.bind(this);
  }

  componentDidMount() {
    this.normalizationValuesCall();
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  setSelectedNormalization(e) {
    //console.log(e.target.id);
    //this.setState({selectedNormalizationDisplayName: e.target.value});
    //this.setState({selectedNormalizationName: e.target.id});
    this.props.dispatch({
      type: 'CHANGE_NORMALIZATION',
      selectedNormalizationName: e.target.id,
      selectedNormalizationDisplayName: e.target.value
    });
  }

  normalizationValuesCall() {
    axios
      .get(`${TRUTHTREE_URI}/api/normalization_types`)
      .then(response => {
        console.log(response.data);
        this.setState({ normalizationValues: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let values = this.state.normalizationValues.map((value, i) => (
      <DropdownItem
        key={i}
        id={value.name}
        value={value.displayValue}
        onClick={this.setSelectedNormalization}
      >
        {value.displayValue}
      </DropdownItem>
    ));

    return (
      <div id="normalisation">
        Normalization attribute:
        <Dropdown
          id="dropdown"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret>
            {' '}
            {this.props.selectedNormalizationDisplayName}{' '}
          </DropdownToggle>
          <DropdownMenu>{values}</DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    selectedNormalizationName:
      state.NormalizationReducer.selectedNormalizationName,
    selectedNormalizationDisplayName:
      state.NormalizationReducer.selectedNormalizationDisplayName
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Normalization);
