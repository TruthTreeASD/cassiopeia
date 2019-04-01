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
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from 'react-html-parser';

class ViewStories extends Component {
  contentHtml(data) {
    return ReactHtmlParser(data);
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
                    <i class="fa fa-thumbs-o-up thumb">
                      {' '}
                      <b>{this.props.storyDetails.upvote} </b>
                    </i>
                  </Col>
                  <Col xs="auto">
                    <i class="fa fa-thumbs-o-down thumb">
                      {' '}
                      <b>{this.props.storyDetails.downvote} </b>
                    </i>
                  </Col>
                </Row>
              )}
              {this.props.admin && (
                <Row className="view float-right">
                  <Col xs="auto">
                    <Button className="myButton" color="primary" size="sm">
                      Approve
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button className="myButton" color="secondary" size="sm">
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
const mapStateToProps = state => {
  return {
    storyDetails: state.TrendingStoriesReducer.storyDetails
  };
};

export default connect(mapStateToProps)(ViewStories);
