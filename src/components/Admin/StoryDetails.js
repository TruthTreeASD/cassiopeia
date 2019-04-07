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

class StoryDetails extends Component {
  constructor(props) {
    super(props);
    this.handleApprove = this.handleApprove.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  contentHtml(data) {
    return ReactHtmlParser(data);
  }

  handleApprove(idNow) {
    axios
      .put(`${TRUTHTREE_URI}/api/stories/story/APPROVED/` + idNow)
      .then(response => {
        let result = [];
        if (response.status === 200) {
          result = _.filter(this.props.adminStories, function(story) {
            return story.id !== idNow;
          });

          let color = [];
          for (var i = 0; i < result.length; i++) {
            color.push('white');
          }

          this.props.dispatch({
            type: 'STORIES_LIST',
            adminStories: result,
            adminStoriesLength: result.length,
            bgColor: color,
            adminSelectedStory: 'none',
            loading: false
          });
          confirmAlert({
            title: 'Approved!',
            message: 'The story has been approved',
            buttons: [
              {
                label: 'OK'
              }
            ]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDecline(idNow) {
    axios
      .put(`${TRUTHTREE_URI}/api/stories/story/DISAPPROVED/` + idNow)
      .then(response => {
        let result = [];
        if (response.status === 200) {
          result = _.filter(this.props.adminStories, function(story) {
            return story.id !== idNow;
          });

          let color = [];
          for (var i = 0; i < result.length; i++) {
            color.push('white');
          }

          this.props.dispatch({
            type: 'STORIES_LIST',
            adminStories: result,
            adminStoriesLength: result.length,
            bgColor: color,
            adminSelectedStory: 'none',
            loading: false
          });
          confirmAlert({
            title: 'Declined!',
            message: 'The story has been declined',
            buttons: [
              {
                label: 'OK'
              }
            ]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(idNow) {
    axios
      .delete(`${TRUTHTREE_URI}/api/stories/` + idNow)
      .then(response => {
        let result = [];
        if (response.status === 200) {
          result = _.filter(this.props.adminStories, function(story) {
            return story.id !== idNow;
          });

          let color = [];
          for (var i = 0; i < result.length; i++) {
            color.push('white');
          }

          this.props.dispatch({
            type: 'STORIES_LIST',
            adminStories: result,
            adminStoriesLength: result.length,
            bgColor: color,
            adminSelectedStory: 'none',
            loading: false
          });
          confirmAlert({
            title: 'Deleted!',
            message: 'The story has been deleted',
            buttons: [
              {
                label: 'OK'
              }
            ]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.props.adminSelectedStory === 'none') {
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
                <CardHeader>{this.props.adminSelectedStory.title}</CardHeader>
              </Media>

              <Row className="view">
                <Col xs="auto" style={{ marginTop: '5px' }}>
                  <i> Tags: </i>
                </Col>
                <Col>
                  {_.map(this.props.adminSelectedStory.tags, tag => {
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
                  {this.contentHtml(this.props.adminSelectedStory.content)}
                </Col>
              </Row>

              <Row className="view">
                <Col xs="auto">
                  {' '}
                  <i>Author:</i>
                </Col>
                <Col>
                  <b>{this.props.adminSelectedStory.author}</b>
                </Col>
              </Row>

              <Row className="view">
                <Col xs="auto">
                  <Button
                    className="myButton"
                    color="primary"
                    size="sm"
                    onClick={() =>
                      this.handleApprove(this.props.adminSelectedStory.id)
                    }
                  >
                    Approve
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    className="myButton"
                    color="secondary"
                    size="sm"
                    onClick={() =>
                      this.handleDecline(this.props.adminSelectedStory.id)
                    }
                  >
                    Decline
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    className="myButton"
                    color="danger"
                    size="sm"
                    onClick={() =>
                      this.handleDelete(this.props.adminSelectedStory.id)
                    }
                  >
                    Delete
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
    adminSelectedStory: state.AdminStoriesReducer.adminSelectedStory,
    adminStories: state.AdminStoriesReducer.adminStories
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryDetails);
