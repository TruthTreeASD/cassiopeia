import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';
import { TRUTHTREE_URI } from '../constants';
import SelectedAttributeReducer from '../reducers/SelectedAttributeReducer';

class AttributeDeselector extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      selectedAttributes: this.props.selectedAttributes
    };
  }

  componentDidMount() {
    console.log('it worked' + this.state.selectedAttributes);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ selectedAttributes: this.nextProps.selectedAttributes });
  }

  render() {
    return <div>TESTING DESELECTOR</div>;
  }
}

const mapState = state => ({
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes
});

export default connect(mapState)(AttributeDeselector);
