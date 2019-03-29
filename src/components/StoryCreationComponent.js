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

//React quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

const MAX_LENGTH = 1000;

class StoryCreationComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      authorField: '',
      titleField: '',
      tagsInputValue: '',
      tagsField: [],
      storyField: '',
      storyTextOnly: '',
      storyMaxLength: MAX_LENGTH
    };
    // this.setState = this.setState.bind(this)
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
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
    let tag = event.target.value.toLowerCase();
    tag = tag.replace('\\n', '!@#$%');
    tag = tag.replace('\\', '');
    tag = tag.replace('!@#$%', '\n');
    tag = tag.replace('*', '');
    if (_.endsWith(tag, ' ')) {
      if (tag.length > 2) {
        this.setState({
          tagsField: [...this.state.tagsField, tag], // This syntax will create new array and add the new tag to that array
          tagsInputValue: ''
        });
      } else {
        this.setState({
          tagsInputValue: ''
        });
      }
    } else {
      this.setState({ tagsInputValue: tag });
    }
  };

  handleChangeStory = (content, delta, source, editor) => {
    this.setState({
      storyField: content,
      storyTextOnly: editor.getText(content)
    });
  };

  submitForm() {
    if (!_.endsWith(window.location.href, 'stories')) {
      console.log(window.location.href);

      if (this.state.storyTextOnly.length > this.state.storyMaxLength) {
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
        axios
          .post(`${TRUTHTREE_URI}/api/stories`, {
            author: this.state.authorField,
            tags:
              this.state.tagsField.length > 0
                ? this.state.tagsField
                : [this.state.tagsInputValue],
            content: this.state.storyField
          })
          .then(function(response) {
            console.log('saved successfully' + response);
          });
        confirmAlert({
          title: 'Story submitted!',
          message: 'Story is now pending review.',
          buttons: [
            {
              label: 'Continue.'
            }
          ]
        });
      }
    } else {
      if (this.state.storyTextOnly.length > this.state.storyMaxLength) {
        alert('Story text is too long.');
        return;
      } else if (this.state.titleField.length < 1) {
        alert('Please enter a story title.');
        return;
      } else {
        axios
          .post(`${TRUTHTREE_URI}/api/stories`, {
            author: this.state.authorField,
            tags:
              this.state.tagsField.length > 0
                ? this.state.tagsField
                : [this.state.tagsInputValue],
            content: this.state.storyField
          })
          .then(function(response) {
            console.log('saved successfully' + response);
          }); /*
        this.props.dispatch({
            type: 'CLOSE_STORY',
            value: false
        });*/
        alert(
          'Story submitted! Feel free to add a new one, or close the window.'
        );
      }
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
          <p>Tell us what you found!</p>
          <input
            className="form-control"
            data-spy="affix"
            data-offset-top="197"
            onChange={this.handleChangeAuthor}
            placeholder="Author Name"
          />
          <br />
          <input
            className="form-control"
            data-spy="affix"
            data-offset-top="197"
            onChange={this.handleChangeTitle}
            placeholder="Story Title"
          />
          <br />
          <input
            className="form-control"
            data-spy="affix"
            data-offset-top="197"
            id="tags-input-field"
            value={this.state.tagsInputValue}
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
              {this.state.tagsField.map((tag, i) => {
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
          <ReactQuill //value={this.state.storyTextOnly}
            onChange={this.handleChangeStory}
            //rows="5"
            placeholder="Story"
          />
          Story length: {this.state.storyTextOnly.length} /
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
