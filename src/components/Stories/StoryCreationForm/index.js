import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { withRouter } from 'react-router-dom';
import { Button, Input, FormGroup, FormFeedback, Spinner } from 'reactstrap';
import ReactQuill from 'react-quill';
import Recaptcha from 'react-recaptcha';

import 'react-quill/dist/quill.snow.css'; // ES6
import 'react-confirm-alert/src/react-confirm-alert.css';

import { closeSideMenu } from '../../../actions/SideMenuActions';
import { TRUTHTREE_URI } from '../../../constants';
import TagInput from './TagInput';
import '../../../styles/StoryCreationForm.scss';

const initialState = {
  featureEnabled: true,
  isSubmitting: false,
  isHuman: false,
  shouldShowCaptchaError: false,
  shouldShowAuthorFieldError: false,
  authorFieldValue: '',
  titleFieldValue: '',
  shouldShowTitleFieldError: false,
  tagsWithLabels: [],
  tagFieldValue: '',
  bodyFieldValue: '',
  bodyFieldTextOnly: '',
  shouldShowBodyFieldError: false
};

const createOption = label => ({
  label,
  value: label
});

class StoryCreationForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.recaptchaInstance = null;
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image'],
      ['clean']
    ]
  };

  componentDidMount() {
    this.setState({ featureEnabled: true });
  }

  handleChangeAuthor = event => {
    this.setState({
      authorFieldValue: event.target.value,
      shouldShowAuthorFieldError: true
    });
  };

  handleChangeTitle = event => {
    this.setState({
      titleFieldValue: event.target.value,
      shouldShowTitleFieldError: true
    });
  };

  handleTagFieldInputChange = tagFieldValue => {
    this.setState({ tagFieldValue });
  };

  handleTagsChange = tagsWithLabels => {
    this.setState({
      tagsWithLabels
    });
  };

  handleTagFieldKeyDown = event => {
    const { tagFieldValue, tagsWithLabels } = this.state;
    if (!tagFieldValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (!tagsWithLabels.some(tag => tag.value === tagFieldValue)) {
          const newTagsWithLabels = [
            ...tagsWithLabels,
            createOption(tagFieldValue)
          ];
          this.setState({
            tagFieldValue: '',
            tagsWithLabels: newTagsWithLabels
          });
        } else {
          this.setState({ tagFieldValue: '' });
        }
        event.preventDefault();
        break;
      default:
    }
  };

  handleChangeStory = (content, delta, source, editor) => {
    const text = editor.getText();
    this.setState({
      bodyFieldValue: content,
      bodyFieldTextOnly: text.slice(0, text.length - 1),
      shouldShowBodyFieldError: true
    });
  };

  handleDiscard = () => {
    this.recaptchaInstance.reset();
    this.setState(initialState, () =>
      this.setState({ shouldShowBodyFieldError: false })
    );
    this.props.dispatch(closeSideMenu());
  };

  submitForm = () => {
    const {
      isHuman,
      authorFieldValue,
      titleFieldValue,
      tagsWithLabels,
      bodyFieldValue,
      bodyFieldTextOnly
    } = this.state;
    this.setState({ isSubmitting: true }, () => {
      if (
        [isHuman, authorFieldValue, titleFieldValue, bodyFieldTextOnly].some(
          field => !field
        )
      ) {
        this.setState({
          isSubmitting: false,
          shouldShowAuthorFieldError: true,
          shouldShowTitleFieldError: true,
          shouldShowBodyFieldError: true,
          shouldShowCaptchaError: true
        });
      } else {
        axios
          .post(`${TRUTHTREE_URI}/api/stories`, {
            author: authorFieldValue,
            title: titleFieldValue,
            tags: tagsWithLabels.map(tag => tag.value),
            content: bodyFieldValue,
            rawContent: bodyFieldTextOnly
          })
          .then(() => {
            this.handleDiscard();
            confirmAlert({
              title: 'Story submitted!',
              message: 'Story is now pending review.',
              buttons: [
                {
                  label: 'Continue.'
                }
              ]
            });
          })
          .catch(console.log);
      }
    });
  };

  render() {
    const {
      isSubmitting,
      isHuman,
      shouldShowCaptchaError,
      authorFieldValue,
      shouldShowAuthorFieldError,
      titleFieldValue,
      shouldShowTitleFieldError,
      tagFieldValue,
      tagsWithLabels,
      bodyFieldValue,
      bodyFieldTextOnly,
      shouldShowBodyFieldError
    } = this.state;
    if (this.state.featureEnabled) {
      return (
        <div className="story-creation-form">
          <h2>Create a story</h2>
          <FormGroup>
            <Input
              invalid={shouldShowAuthorFieldError && !authorFieldValue}
              onChange={this.handleChangeAuthor}
              value={authorFieldValue}
              placeholder="Author Name *"
            />
            <FormFeedback>Author can't be blank</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              invalid={shouldShowTitleFieldError && !titleFieldValue}
              onChange={this.handleChangeTitle}
              value={titleFieldValue}
              placeholder="Story Title *"
            />
            <FormFeedback>Title can't be blank</FormFeedback>
          </FormGroup>
          <FormGroup className="position-relative">
            <TagInput
              inputValue={tagFieldValue}
              tagsWithLabels={tagsWithLabels}
              onChange={this.handleTagsChange}
              onInputChange={this.handleTagFieldInputChange}
              onKeyDown={this.handleTagFieldKeyDown}
            />
          </FormGroup>
          <FormGroup>
            <ReactQuill //value={this.state.storyTextOnly}
              onChange={this.handleChangeStory}
              modules={this.modules}
              value={bodyFieldValue}
              placeholder="Tell us what you found"
            />
            <small
              className={`${
                shouldShowBodyFieldError && !bodyFieldTextOnly ? '' : 'd-none'
              } text-danger`}
            >
              Body can't be blank
            </small>
          </FormGroup>
          <FormGroup>
            <Recaptcha
              ref={e => (this.recaptchaInstance = e)}
              sitekey="6Ldb85sUAAAAAKe6zdfI6jMm2SBDTzvmJ8iOP9kV"
              render="explicit"
              theme="dark"
              verifyCallback={() => this.setState({ isHuman: true })}
            />
            <small
              className={`${
                !isHuman && shouldShowCaptchaError ? '' : 'd-none'
              } text-danger`}
            >
              Hello fellow bot
            </small>
          </FormGroup>
          {isSubmitting ? (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          ) : (
            <div>
              <Button color="primary" onClick={this.submitForm} block>
                Submit
              </Button>
              <Button color="secondary" onClick={this.handleDiscard} block>
                Discard
              </Button>
            </div>
          )}
        </div>
      );
    } else {
      return <div>THIS SECTION HAS BEEN DISABLED</div>;
    }
  }
}

export default withRouter(connect(null)(StoryCreationForm));
