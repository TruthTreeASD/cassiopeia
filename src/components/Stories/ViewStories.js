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
          type: 'SELECTED_STORY',
          storyDetails: response.data
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
          type: 'SELECTED_STORY',
          storyDetails: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleApprove(id) {
    axios
      .get(`${TRUTHTREE_URI}/api/stories/approve?id=` + id)
      .then(response => {
        if (response.status === 200) {
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

  handleDecline(id) {
    //call api for decline
  }

  render() {
    if (this.props.storyDetails === 'none') {
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
                <CardHeader>{this.props.storyDetails.title}</CardHeader>
              </Media>

              <Row className="view">
                <Col xs="auto" style={{ marginTop: '5px' }}>
                  <i> Tags: </i>
                </Col>
                <Col>
                  {_.map(this.props.storyDetails.tags, tag => {
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
                <Col>{this.contentHtml(this.props.storyDetails.content)}</Col>
              </Row>

              <Row className="view">
                <Col xs="auto">
                  {' '}
                  <i>Author:</i>
                </Col>
                <Col>
                  <b>{this.props.storyDetails.author}</b>
                </Col>
              </Row>
              {!this.props.admin && (
                <Row className="view float-right">
                  <Col xs="auto">
                    <Button
                      className="fa fa-thumbs-o-up thumb view-story"
                      color="primary"
                      onClick={() =>
                        this.handleUpVoteClick(this.props.storyDetails.id)
                      }
                    >
                      &nbsp;{this.props.storyDetails.upvote}
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button
                      className="fa fa-thumbs-o-down thumb view-story"
                      color="secondary"
                      onClick={() =>
                        this.handleDownVoteClick(this.props.storyDetails.id)
                      }
                    >
                      &nbsp;{this.props.storyDetails.downvote}
                    </Button>
                  </Col>
                </Row>
              )}
              {this.props.admin && (
                <Row className="view float-right">
                  <Col xs="auto">
                    <Button
                      className="myButton"
                      color="primary"
                      size="sm"
                      onClick={() =>
                        this.handleApprove(this.props.storyDetails.id)
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
                        this.handleDecline(this.props.storyDetails.id)
                      }
                    >
                      Reject
                    </Button>
                  </Col>
                </Row>
              )}
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
    storyDetails: state.TrendingStoriesReducer.storyDetails
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewStories);
