import React, { Component } from 'react';
import { Media, Row, Badge, Alert, Card, Col, CardHeader } from 'reactstrap';
import '../../styles/ViewStories.css';
import { connect } from 'react-redux';
import _ from 'lodash';

class ViewStories extends Component {
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
                <Col>
                  <b>{this.props.storyDetails.content}</b>
                </Col>
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
