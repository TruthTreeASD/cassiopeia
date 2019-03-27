import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Media, Badge } from 'reactstrap';
import _ from 'lodash';
import '../../styles/TrendingStories.css';
import { mockData } from '../../mockData/storyData';
import axios from 'axios/index';
import { TRUTHTREE_URI } from '../../constants';

class TrendingStories extends Component {
  constructor(props) {
    super(props);
    this.getStoryDetails = this.getStoryDetails.bind(this);
    this.handleUpVoteClick = this.handleUpVoteClick.bind(this);
    this.handleDownVoteClick = this.handleDownVoteClick.bind(this);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios
      .get(`${TRUTHTREE_URI}/api/stories`)
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
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
          _.sortBy(this.state.data, [
            function(o) {
              return o.upvotes - o.downvotes;
            }
          ]).reverse(),
          data => {
            return (
              <div>
                <Media heading>{data.title}</Media>
                {_.map(data.tags, tag => {
                  return (
                    <Badge className="tag" color="secondary">
                      {tag}
                    </Badge>
                  );
                })}
                {!_.isEmpty(data.tags) && <br />}
                {_.truncate(data.content)}
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
      <div>
        <input
          className="form-control searchBar"
          data-spy="affix"
          // onChange={this.handleChangeSearch}
          placeholder="Search stories by title or tag name"
        />
        <div>
          <Media>{this.getStoryDetails()}</Media>
        </div>
      </div>
    );
  }
}

export default TrendingStories;
