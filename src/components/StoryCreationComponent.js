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
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

class StoryCreationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      selectedAttributes: [],
      authorField: '',
      titleField: '',
      tagsInputValue: '',
      tagsField: [],
      storyField: '',
      storyMaxLength: 1000
    };
    // Set initial state of each collection to false
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
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

  handleChangeTitle = event => {
    let title = event.target.value.toLowerCase();
    title = title.replace('\\', '');
    title = title.replace('*', '');
    this.setState({ titleField: title });
  };

  handleChangeTags = event => {
    console.log(this.state.tagsField);
    let tag = event.target.value.toLowerCase();
    tag = tag.replace('\\', '');
    tag = tag.replace('*', '');
    if (_.endsWith(tag, ' ')) {
      let newArr = this.state.tagsField;
      newArr.push(tag);
      this.setState({
        tagsField: newArr,
        tagsInputValue: ''
      });

      document.getElementById('tags-input-field').value = '';
    }
  };

  handleChangeStory = event => {
    let story = event.target.value.toLowerCase();
    story = story.replace('\\', '');
    story = story.replace('*', '');
    this.setState({ storyField: story });
  };

  submitForm() {
    if (this.state.storyField.length > this.state.storyMaxLength) {
      confirmAlert({
        title: 'Error!',
        message: 'Story text is too long.',
        buttons: [
          {
            label: 'OK'
          }
        ]
      });
      return;
    } else if (this.state.titleField.length < 1) {
      confirmAlert({
        title: 'Error!',
        message: 'Please enter a story title.',
        buttons: [
          {
            label: 'OK'
          }
        ]
      });
      return;
    } else {
      /* {
              storyTitle: this.titleField,
              
          }*/
    }
  }

  removeTag = tag => {
    let newArr = this.state.tagsField;
    newArr.splice(tag, 1);
    this.setState({
      tagsField: newArr
    });
  };
  render() {
    if (this.state.isLoaded) {
      return (
        <div>
          {/*<FroalaEditor />*/}
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
            //id="attribute-search-box"
            onChange={this.handleChangeTitle}
            placeholder="Story Title"
          />
          <br />
          <input
            className="form-control"
            data-spy="affix"
            data-offset-top="197"
            id="tags-input-field"
            onChange={this.handleChangeTags}
            placeholder="Tags"
          />
          <Row>
            <Col xs="auto" className="filters">
              {this.state.tagsField.length > 0
                ? 'Selected Tags:'
                : 'Please add a tag!'}
            </Col>
            <Col>
              {Object.keys(this.state.tagsField).map((tag, i) => {
                return (
                  <i>
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        this.removeTag(tag);
                      }}
                    >
                      <i
                        className="fa fa-times"
                        style={{ paddingRight: '10px' }}
                      />
                      {this.state.tagsField[i]}
                    </button>{' '}
                  </i>
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
          Story length: {this.state.storyField.length} /
          {this.state.storyMaxLength}
          <br />
          <button
            className="btn btn-light selected-attribute-button"
            onClick={() => this.submitForm()}
          >
            <i className="fa" />
            SUBMIT STORY
          </button>
        </div>
      );
    } else {
      return <div>THIS SECTION HAS BEEN DISABLED</div>;
    }
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StoryCreationComponent));
