import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { Media } from 'reactstrap';
import _ from 'lodash';
import '../../styles/TrendingStories.css';
import { mockData } from '../../mockData/storyData';

class TrendingStories extends Component {
  constructor(props) {
    super(props);
    this.getStoryDetails = this.getStoryDetails.bind(this);
    this.handleUpVoteClick = this.handleUpVoteClick.bind(this);
    this.handleDownVoteClick = this.handleDownVoteClick.bind(this);
  }

  handleUpVoteClick(data) {
    data.upvotes++;
    //api call to change data
  }

  handleDownVoteClick(data) {
    data.downvotes++;
    //api call to change data
  }

  getStoryDetails() {
    return (
      <Media body>
        {_.map(
          _.sortBy(mockData, [
            function(o) {
              return o.upvotes - o.downvotes;
            }
          ]).reverse(),
          data => {
            return (
              <div>
                <Media heading>{data.title}</Media>
                {_.truncate(data.body)}
                <br />
                <i
                  onClick={this.handleUpVoteClick(data)}
                  class="fa fa-thumbs-o-up thumb"
                />
                <i
                  onClick={this.handleDownVoteClick(data)}
                  class="fa fa-thumbs-o-down thumb"
                />
                <hr />
              </div>
            );
          }
        )}
      </Media>
    );
  }

  render() {
    return (
      <Card>
        <CardHeader>Trending Stories</CardHeader>

        <CardBody>
          <Media>{this.getStoryDetails()}</Media>
        </CardBody>
      </Card>
    );
  }
}

export default TrendingStories;
