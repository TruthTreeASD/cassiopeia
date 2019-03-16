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

    return (
      <div>
        <p>Tell us what you found!</p>
        <input
          className="form-control"
          data-spy="affix"
          data-offset-top="197"
          //id="attribute-search-box"
          //onChange={this.handleChangeSearch}
          placeholder="Author Name"
        />
        <br />
        <input
          className="form-control"
          data-spy="affix"
          data-offset-top="197"
          // id="attribute-search-box"
          //onChange={this.handleChangeSearch}
          placeholder="Tags"
        />
        <br />
        <textarea
          className="form-control"
          rows="5"
          data-spy="affix"
          data-offset-top="197"
          //id="attribute-search-box"
          //onChange={this.handleChangeSearch}
          placeholder="Story"
        />
        <button
          className="btn btn-light selected-attribute-button"
          onClick={
            () => console.log('Submitted form')
            //    this.deselectAttribute(this.state.selectedAttributes[i])
          }
        >
          <i className="fa" />
          SUBMIT STORY
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StoryCreationComponent));
