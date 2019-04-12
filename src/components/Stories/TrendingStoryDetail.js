import React, { Component } from 'react';
import {
  Media,
  Row,
  Badge,
  Alert,
  Card,
  Col,
  CardHeader,
  Button
} from 'reactstrap';
import '../../styles/ViewStories.css';
import { connect } from 'react-redux';
import _ from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { TRUTHTREE_URI } from '../../constants';
import axios from 'axios/index';
import { confirmAlert } from 'react-confirm-alert';

class TrendingStoryDetail extends Component {
  constructor(props) {
    super(props);
    this.handleUpVoteClick = this.handleUpVoteClick.bind(this);
    this.handleDownVoteClick = this.handleDownVoteClick.bind(this);
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

  render() {
    if (this.props.TrendingStoriesReducer.userSelectedStory === 'none') {
      return (
        <div>
          <Alert color="primary">
            Please select a story to view its details!
          </Alert>
        </div>
      );
    } else {
      return (
        <Card className="view-story">
          <Media>
            <Media body>
              <Media heading>
                <CardHeader>
                  {this.props.TrendingStoriesReducer.userSelectedStory.title}
                </CardHeader>
              </Media>

              <Row className="view">
                <Col xs="auto" style={{ marginTop: '5px' }}>
                  <i> Tags: </i>
                </Col>
                <Col>
                  {_.map(
                    this.props.TrendingStoriesReducer.userSelectedStory.tags,
                    tag => {
                      return (
                        <Badge className="tag view" color="secondary">
                          {tag}
                        </Badge>
                      );
                    }
                  )}
                </Col>
              </Row>

              <Row className="view">
                <Col xs="auto">
                  <i>Description:</i>
                </Col>
                <Col>
                  {this.contentHtml(
                    this.props.TrendingStoriesReducer.userSelectedStory.content
                  )}
                </Col>
              </Row>

              <Row className="view">
                <Col xs="auto">
                  {' '}
                  <i>Author:</i>
                </Col>
                <Col>
                  <b>
                    {this.props.TrendingStoriesReducer.userSelectedStory.author}
                  </b>
                </Col>
              </Row>

              <Row className="view float-right">
                <Col xs="auto">
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
                </Col>
                <Col xs="auto">
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
                    {
                      this.props.TrendingStoriesReducer.userSelectedStory
                        .downvote
                    }
                  </Button>
                </Col>
              </Row>
            </Media>
          </Media>
        </Card>
      );
    }
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
