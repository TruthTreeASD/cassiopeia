import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';
import { TRUTHTREE_URI } from '../constants';
import SelectedAttributeReducer from '../reducers/SelectedAttributeReducer';

class AttributeDeselector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: []
    };
  }

  componentDidMount() {
    this.setState({ selectedAttribtes: this.props.selectedAttributes });
    console.log(this.state.selectedAttributes);
    console.log('it worked' + this.state.selectedAttributes);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ selectedAttributes: nextProps.selectedAttributes });
    console.log('got prop');
  }

  render() {
    if (this.state.selectedAttributes.length < 1) {
      return <div>TESTING DESELECTOR</div>;
    } else {
      return <div>attribute Selected</div>;
    }
  }
}

const mapState = state => ({
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes
});

export default connect(mapState)(AttributeDeselector);
