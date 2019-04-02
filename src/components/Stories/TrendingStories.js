import React, { Component } from 'react';
import { Spinner, Card, Media, Badge, Row } from 'reactstrap';
import _ from 'lodash';
import '../../styles/TrendingStories.css';
import axios from 'axios/index';
import { TRUTHTREE_URI } from '../../constants';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

class TrendingStories extends Component {
  constructor(props) {
    super(props);
    this.getStoryDetails = this.getStoryDetails.bind(this);
    this.selectStory = this.selectStory.bind(this);
    this.state = {
      InitialData: [],
      bgColor: []
    };
  }

  contentHtml(data) {
    return ReactHtmlParser(data);
  }

  componentDidMount() {
    //List of approved stories if not admin
    axios
      .get(`${TRUTHTREE_URI}/api/stories/approved`)
      .then(response => {
        let color = [];
        for (var i = 0; i < response.data.length; i++) {
          color.push('white');
        }
        this.props.dispatch({
          type: 'APPROVED_STORIES_LIST',
          approvedStories: response.data,
          approvedStoriesLength: response.data.length,
          color: color,
          userSelectedStory: 'none',
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //Highlighting the selected story panel & storing its details in redux
  selectStory(data, index) {
    let bgColor = [];
    for (
      var i = 0;
      i < this.props.TrendingStoriesReducer.approvedStoriesLength;
      i++
    ) {
      if (i === index) {
        bgColor.push('#f2f2f2');
      } else {
        bgColor.push('white');
      }
    }
    console.log(bgColor);
    this.setState({ bgColor: bgColor });
    this.props.dispatch({
      type: 'USER_SELECTED_STORY',
      approvedStories: this.props.TrendingStoriesReducer.approvedStories,
      approvedStoriesLength: this.props.TrendingStoriesReducer
        .approvedStoriesLength,
      color: bgColor,
      userSelectedStory: data,
      loading: false
    });
    this.setState({ bgColor: this.props.TrendingStoriesReducer.color });
  }

  //Displaying each story
  getStoryDetails() {
    return (
      <Media body>
        {_.map(
          _.sortBy(this.props.TrendingStoriesReducer.approvedStories, [
            function(o) {
              return o.upvote - o.downvote;
            }
          ]).reverse(),
          (data, index) => {
            return (
              <Card
                className="pointer"
                onClick={() => this.selectStory(data, index)}
                style={{
                  backgroundColor: this.props.TrendingStoriesReducer.color[
                    index
                  ]
                }}
              >
                <Media heading className="trending">
                  {data.title}
                </Media>

                <Row className="trending">
                  {_.map(data.tags, tag => {
                    return (
                      <Badge className="tag" color="secondary">
                        {tag}
                      </Badge>
                    );
                  })}
                </Row>
                <Row className="trending">
                  <div style={{ padding: '10px' }}>
                    {this.contentHtml(_.truncate(data.content, { length: 50 }))}
                  </div>
                </Row>
                {!this.props.admin && (
                  <Row className="trending">
                    <i className="fa fa-thumbs-o-up thumb"> {data.upvote} </i>
                    <i className="fa fa-thumbs-o-down thumb">
                      {' '}
                      {data.downvote}{' '}
                    </i>
                  </Row>
                )}
              </Card>
            );
          }
        )}
      </Media>
    );
  }

  render() {
    //Displaying spinner untill API fetches the data
    if (this.props.TrendingStoriesReducer.loading) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner className="align-self-center" color="secondary" size="sm" />
        </div>
      );
    }
    //Dislaying list of stories
    else {
      return (
        <div>
          <input
            className="form-control searchBar"
            data-spy="affix"
            // onChange={this.handleChangeSearch}
            placeholder="Search stories by title or tag name"
          />
          <div>
            <Media className="trending-height">{this.getStoryDetails()}</Media>
          </div>
        </div>
      );
    }
  }
}
const mapDispatchToProps = dispatch => ({ dispatch });
const mapStateToProps = state => {
  return {
    TrendingStoriesReducer: state.TrendingStoriesReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingStories);
