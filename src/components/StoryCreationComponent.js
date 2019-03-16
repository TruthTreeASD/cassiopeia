import React, { Component } from 'react';
import '../styles/LeftSideBar.css';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import { TRUTHTREE_URI } from '../constants';
import { withRouter } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';

class StoryCreationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      selectedAttributes: []
    };
    // Set initial state of each collection to false
  }

  componentDidMount() {
    /* axios
           .get(
             `${TRUTHTREE_URI}/api/collections?locationId=` + //382026003
               this.props.match.params.id // +&year=2016
           )
           .then(response => {
             //data contains the variables
             this.setState({
               sidebarData: response.data,
               isLoaded: true
             });
           })
           .catch(error => {
             console.log(error);
           });*/
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    var { isLoaded } = this.state;
    var active = false;

    return <div>USER STORY</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StoryCreationComponent));
