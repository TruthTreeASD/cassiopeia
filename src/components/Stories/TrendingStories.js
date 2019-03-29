import React, { Component } from 'react';
import { Card, Media, Badge, Row } from 'reactstrap';
import _ from 'lodash';
import '../../styles/TrendingStories.css';
import axios from 'axios/index';
import { TRUTHTREE_URI } from '../../constants';
import { connect } from 'react-redux';

class TrendingStories extends Component {
  constructor(props) {
    super(props);
    this.getStoryDetails = this.getStoryDetails.bind(this);
    this.handleUpVoteClick = this.handleUpVoteClick.bind(this);
    this.handleDownVoteClick = this.handleDownVoteClick.bind(this);
    this.selectStory = this.selectStory.bind(this);
    this.state = {
      data: [],
      length: 0,
      bgColor: []
    };
  }

  componentDidMount() {
    axios
      .get(`${TRUTHTREE_URI}/api/stories`)
      .then(response => {
        this.setState({
          data: response.data
        });
        this.setState({
          length: response.data.length
        });
        console.log(response);
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

  selectStory(data, index) {
    let color = [];
    for (var i = 0; i < this.state.length; i++) {
      if (i === index) {
        color.push('#f2f2f2');
      } else {
        color.push('white');
      }
    }
    this.setState({
      bgColor: color
    });

    this.props.dispatch({
      type: 'SELECTED_STORY',
      storyDetails: data
    });
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
          (data, index) => {
            return (
              <Card
                className="pointer"
                onClick={() => this.selectStory(data, index)}
                style={{ backgroundColor: this.state.bgColor[index] }}
              >
                <Media heading>{data.title}</Media>
                <Row className="trending">
                  {_.map(data.tags, tag => {
                    return (
                      <Badge className="tag" color="secondary">
                        {tag}
                      </Badge>
                    );
                  })}
                </Row>
                {!_.isEmpty(data.tags) && <br />}
                <Row className="trending">
                  {_.truncate(data.content)}
                  <br />
                </Row>
                <Row className="trending">
                  <i
                    onClick={this.handleUpVoteClick(data)}
                    class="fa fa-thumbs-o-up thumb"
                  >
                    {' '}
                    {_.compact(data.upvotes)}{' '}
                  </i>
                  <i
                    onClick={this.handleDownVoteClick(data)}
                    class="fa fa-thumbs-o-down thumb"
                  >
                    {_.compact(data.downvotes)}
                  </i>
                </Row>
              </Card>
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
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(TrendingStories);
