import React, { Component } from 'react';

import '../styles/Header.css';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
import axios from 'axios/index';
import { TRUTHTREE_URI } from '../constants';

class Normalization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      selectedNormalization: 'Gross',
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

  setSelectedNormalization(value) {
    this.setState(prevState => ({
      selectedNormalization: value
    }));
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
    return (
      <div id="normalisation">
        Normalization attribute:
        <Dropdown
          id="dropdown"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret>
            {this.state.selectedNormalization}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => this.setSelectedNormalization('Gross')}
            >
              Gross
            </DropdownItem>
            <DropdownItem
              onClick={() => this.setSelectedNormalization('Per Capita')}
            >
              Per Capita
            </DropdownItem>
            <DropdownItem
              onClick={() => this.setSelectedNormalization('Per Revenue')}
            >
              Per Revenue
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default Normalization;
