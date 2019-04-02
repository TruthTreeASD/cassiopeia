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

class ViewStories extends Component {
  constructor(props) {
    super(props);
    this.handleUpVoteClick = this.handleUpVoteClick.bind(this);
    this.handleDownVoteClick = this.handleDownVoteClick.bind(this);
  }

  contentHtml(data) {
    return ReactHtmlParser(data);
  }

  handleUpVoteClick(id) {
    let upvoteUrl = `${TRUTHTREE_URI}/api/stories/` + id + '?type=UPVOTE';
    console.log(upvoteUrl);
    axios
      .put(upvoteUrl)
      .then(response => {
        this.props.dispatch({
          type: 'USER_SELECTED_STORY',
          approvedStories: this.props.TrendingStoriesReducer.approvedStories,
          approvedStoriesLength: this.props.TrendingStoriesReducer
            .approvedStoriesLength,
          color: this.props.TrendingStoriesReducer.color,
          userSelectedStory: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDownVoteClick(id) {
    let downvoteUrl = `${TRUTHTREE_URI}/api/stories/` + id + '?type=DOWNVOTE';
    console.log(downvoteUrl);
    axios
      .put(downvoteUrl)
      .then(response => {
        this.props.dispatch({
          type: 'USER_SELECTED_STORY',
          approvedStories: this.props.TrendingStoriesReducer.approvedStories,
          approvedStoriesLength: this.props.TrendingStoriesReducer
            .approvedStoriesLength,
          color: this.props.TrendingStoriesReducer.color,
          userSelectedStory: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.props.userSelectedStory === 'none') {
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
                <CardHeader>{this.props.userSelectedStory.title}</CardHeader>
              </Media>

              <Row className="view">
                <Col xs="auto" style={{ marginTop: '5px' }}>
                  <i> Tags: </i>
                </Col>
                <Col>
                  {_.map(this.props.userSelectedStory.tags, tag => {
                    return (
                      <Badge className="tag view" color="secondary">
                        {tag}
                      </Badge>
                    );
                  })}
                </Col>
              </Row>

              <Row className="view">
                <Col xs="auto">
                  <i>Description:</i>
                </Col>
                <Col>
                  {this.contentHtml(this.props.userSelectedStory.content)}
                </Col>
              </Row>

              <Row className="view">
                <Col xs="auto">
                  {' '}
                  <i>Author:</i>
                </Col>
                <Col>
                  <b>{this.props.userSelectedStory.author}</b>
                </Col>
              </Row>

              <Row className="view float-right">
                <Col xs="auto">
                  <Button
                    className="fa fa-thumbs-o-up thumb view-story"
                    color="primary"
                    onClick={() =>
                      this.handleUpVoteClick(this.props.userSelectedStory.id)
                    }
                  >
                    &nbsp;{this.props.userSelectedStory.upvote}
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    className="fa fa-thumbs-o-down thumb view-story"
                    color="secondary"
                    onClick={() =>
                      this.handleDownVoteClick(this.props.userSelectedStory.id)
                    }
                  >
                    &nbsp;{this.props.userSelectedStory.downvote}
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
    userSelectedStory: state.TrendingStoriesReducer.userSelectedStory,
    approvedStories: state.TrendingStoriesReducer.approvedStories
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewStories);
