import React, { Component } from 'react';
import { Media, Row, Badge, Alert, Card } from 'reactstrap';
import '../../styles/ViewStories.css';
import { connect } from 'react-redux';
import _ from 'lodash';

class ViewStories extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
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
            <Media body className="view">
              <Media heading>{this.props.storyDetails.title}</Media>
              <Row className="view">
                <i className="font" style={{ marginTop: '5px' }}>
                  Tags:
                </i>
                {_.map(this.props.storyDetails.tags, tag => {
                  return (
                    <Badge className="tag view" color="secondary">
                      {tag}
                    </Badge>
                  );
                })}
              </Row>
              <Row className="view">
                <i>Description:</i>
                <br />
                {this.props.storyDetails.content}
              </Row>
              <Row className="view">
                Author:{'     '}
                {this.props.storyDetails.authorName}
              </Row>
              <Row className="view">
                <i class="fa fa-thumbs-o-up thumb">
                  {' '}
                  {this.props.storyDetails.upvote}{' '}
                </i>
                <i class="fa fa-thumbs-o-down thumb">
                  {' '}
                  {this.props.storyDetails.downvote}{' '}
                </i>
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
