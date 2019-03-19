import React, { Component } from 'react';
import '../styles/LeftSideBar.css';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import { TRUTHTREE_URI } from '../constants';
import { withRouter } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from 'reactstrap';

import '../styles/AttributeDeselector.css';

class StoryCreationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      selectedAttributes: [],
      authorField: '',
      tagsField: [],
      storyField: ''
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

  componentWillReceiveProps(nextProps) {
    //    this.setState({ tagsField: nextProps.selectedAttributes });
    //    console.log(this.state.tagsField)
  }

  handleChangeAuthor = event => {
    let author = event.target.value.toLowerCase();
    author = author.replace('\\', '');
    author = author.replace('*', '');
    this.setState({ authorField: author });
  };

  handleChangeTags = event => {
    let tag = event.target.value.toLowerCase();
    tag = tag.replace('\\', '');
    tag = tag.replace('*', '');
    if (_.endsWith(tag, ' ')) {
      let newArr = this.state.tagsField;
      newArr.push(tag);
      this.setState({
        selectedAttributes: newArr
      });
      console.log(this.state.tagsField);
    }
  };

  handleChangeStory = event => {
    let story = event.target.value.toLowerCase();
    story = story.replace('\\', '');
    story = story.replace('*', '');
    this.setState({ storyField: story });
  };
  /*
    deselectAttribute(attribute) {
        let newArr = this.state.selectedAttributes;
        let id = attribute[0];
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i][0] === id) {
                _.remove(newArr, elem => {
                    return elem === newArr[i];
                });
                this.setState({
                    selectedAttributes: newArr
                });
                this.props.dispatch({
                    type: 'CHANGE_ATTRIBUTE',
                    value: newArr
                });
                return;
            }
        }
    }
    */
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
          onChange={this.handleChangeAuthor}
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
        <Row>
          <Col xs="auto" className="filters">
            Selected Tags:
          </Col>
          <Col>
            {Object.keys(this.state.tagsField).map((attributes, i) => {
              return (
                <button
                  className="btn btn-light selected-attribute-button"
                  /* onClick={() =>
                                    this.deselectAttribute(this.state.selectedAttributes[i])
                                }*/
                >
                  <i className="fa fa-times" style={{ paddingRight: '10px' }} />
                  {this.state.tagsField[i][2]}-{this.state.tagsField[i][1]}
                </button>
              );
            })}
          </Col>
        </Row>
        <br />
        <textarea
          className="form-control"
          rows="5"
          data-spy="affix"
          data-offset-top="197"
          //id="attribute-search-box"
          onChange={this.handleChangeStory}
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
