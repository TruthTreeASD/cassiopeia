import React, { Component } from 'react';
import { Row, Badge, Col, Button } from 'reactstrap';
import '../../styles/ViewStories.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { TRUTHTREE_URI } from '../../constants';
import axios from 'axios/index';
import { confirmAlert } from 'react-confirm-alert';

const mobileStyle = 800;

class TrendingStoryDetail extends Component {
  constructor(props) {
    super(props);
    this.handleUpVoteClick = this.handleUpVoteClick.bind(this);
    this.handleDownVoteClick = this.handleDownVoteClick.bind(this);
    this.closeStory = this.closeStory.bind(this);
  }

  contentHtml(data) {
    return ReactHtmlParser(data);
  }

  handleUpVoteClick(story) {
    let checkCondition = story.id;
    if (!localStorage.getItem(checkCondition)) {
      axios({
        method: 'put',
        url: `${TRUTHTREE_URI}/api/stories?type=UPVOTE`,
        data: JSON.stringify(story),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          var arr = this.props.TrendingStoriesReducer.approvedStories;
          var indexOfId = _.findIndex(arr, { id: story.id });
          arr.splice(indexOfId, 1, response.data);

          let key = story.id;
          localStorage.setItem(key, 'true');

          this.props.dispatch({
            type: 'USER_SELECTED_STORY',
            approvedStories: arr,
            approvedStoriesLength: arr.length,
            color: this.props.TrendingStoriesReducer.color,
            userSelectedStory: response.data,
            loading: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      confirmAlert({
        title: 'Thank You!',
        message: 'You have voted on the story previously.',
        buttons: [
          {
            label: 'OK'
          }
        ]
      });
    }
  }

  handleDownVoteClick(story) {
    let checkCondition = story.id;
    if (!localStorage.getItem(checkCondition)) {
      axios({
        method: 'put',
        url: `${TRUTHTREE_URI}/api/stories?type=DOWNVOTE`,
        data: JSON.stringify(story),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          var arr = this.props.TrendingStoriesReducer.approvedStories;
          var indexOfId = _.findIndex(arr, { id: story.id });
          arr.splice(indexOfId, 1, response.data);

          let key = story.id;
          localStorage.setItem(key, 'true');

          this.props.dispatch({
            type: 'USER_SELECTED_STORY',
            approvedStories: arr,
            approvedStoriesLength: arr.length,
            color: this.props.TrendingStoriesReducer.color,
            userSelectedStory: response.data,
            loading: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      confirmAlert({
        title: 'Thank You!',
        message: 'You have voted on the story previously.',
        buttons: [
          {
            label: 'OK'
          }
        ]
      });
    }
  }

  closeStory() {
    this.props.dispatch({
      type: 'USER_SELECTED_STORY',
      approvedStories: this.props.TrendingStoriesReducer.approvedStories,
      approvedStoriesLength: this.props.TrendingStoriesReducer
        .approvedStoriesLength,
      color: 'white',
      userSelectedStory: 'none',
      loading: false
    });
  }

  render() {
    if (!this.props.TrendingStoriesReducer.userSelectedStory) return null;
    return (
      <Row className={this.props.className}>
        <Col>
          <Button
            className="my-2"
            onClick={() =>
              this.props.dispatch({
                type: 'TRENDING_STORIES_CLEAR_SELECTION'
              })
            }
          >
            <i class="fa fa-long-arrow-left" aria-hidden="true" /> Back
          </Button>
          <h2 className="my-3 text-center">
            {this.props.TrendingStoriesReducer.userSelectedStory.title}
          </h2>
          <div className="d-flex justify-content-between my-2">
            <div>
              <Button
                className="fa fa-thumbs-o-up thumb view-story"
                color="primary"
                onClick={() =>
                  this.handleUpVoteClick(
                    this.props.TrendingStoriesReducer.userSelectedStory
                  )
                }
              >
                &nbsp;
                {this.props.TrendingStoriesReducer.userSelectedStory.upvote}
              </Button>
              &nbsp;
              <Button
                className="fa fa-thumbs-o-down thumb view-story"
                color="primary"
                onClick={() =>
                  this.handleDownVoteClick(
                    this.props.TrendingStoriesReducer.userSelectedStory
                  )
                }
              >
                &nbsp;
                {this.props.TrendingStoriesReducer.userSelectedStory.downvote}
              </Button>
            </div>
            <div className="d-flex align-items-center">
              By:&nbsp;{' '}
              <strong>
                {this.props.TrendingStoriesReducer.userSelectedStory.author}
              </strong>
            </div>
          </div>
          <div>
            {this.contentHtml(
              this.props.TrendingStoriesReducer.userSelectedStory.content
            )}
          </div>
          {_.map(
            this.props.TrendingStoriesReducer.userSelectedStory.tags,
            tag => {
              return (
                <span className="h5">
                  <Badge color="secondary">{tag}</Badge>
                  &nbsp;
                </span>
              );
            }
          )}
        </Col>
      </Row>
    );
  }
}
const mapDispatchToProps = dispatch => ({ dispatch });

const mapStateToProps = state => {
  return {
    TrendingStoriesReducer: state.TrendingStoriesReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingStoryDetail);
