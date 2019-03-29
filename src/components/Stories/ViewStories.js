import React, { Component } from 'react';
import { Media, Row, Badge, Alert } from 'reactstrap';
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
        <Media>
          <Media body>
            <Media heading>{this.props.storyDetails.title}</Media>
            <Row className="view">
              Tags:
              {_.map(this.props.storyDetails.tags, tag => {
                return (
                  <Badge className="tag" color="secondary">
                    {tag}
                  </Badge>
                );
              })}
            </Row>

            {!_.isEmpty(this.props.storyDetails.tags) && <br />}

            <Row className="view">
              Description:
              <br />
              {this.props.storyDetails.content}
            </Row>
            <Row className="view">
              Author:{'     '}
              {this.props.storyDetails.authorName}
              <br />
              <br />
            </Row>
            <Row className="view">
              <i class="fa fa-thumbs-o-up thumb">
                {_.compact(this.props.storyDetails.upvotes)}
              </i>
              <i class="fa fa-thumbs-o-down thumb">
                {_.compact(this.props.storyDetails.downvotes)}
              </i>
            </Row>
          </Media>
        </Media>
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
