import React, { Component } from 'react';
import { Spinner, Card, Media, Badge, Row } from 'reactstrap';
import _ from 'lodash';
import '../../styles/TrendingStories.css';
import axios from 'axios/index';
import { TRUTHTREE_URI } from '../../constants';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

class PendingApprovalStories extends Component {
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
    //List of stories to be approved if admin
    axios
      .get(`${TRUTHTREE_URI}/api/stories?storyStatus=PENDING`)
      //Change the api call to unapproved stories
      .then(response => {
        let color = [];
        for (var i = 0; i < response.data.length; i++) {
          color.push('white');
        }
        this.props.dispatch({
          type: 'STORIES_LIST',
          adminStories: response.data,
          adminStoriesLength: response.data.length,
          bgColor: color,
          adminSelectedStory: 'none',
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //Highlighting the selected story panel & storing its details in redux
  selectStory(data, index) {
    let color = [];
    for (
      var i = 0;
      i < this.props.AdminStoriesReducer.adminStoriesLength;
      i++
    ) {
      if (i === index) {
        color.push('#f2f2f2');
      } else {
        color.push('white');
      }
    }

    this.setState({ bgColor: color });
    this.props.dispatch({
      type: 'ADMIN_SELECTED_STORY',
      adminStories: this.props.AdminStoriesReducer.adminStories,
      adminStoriesLength: this.props.AdminStoriesReducer.adminStoriesLength,
      bgColor: color,
      adminSelectedStory: data,
      loading: false
    });
    this.setState({ bgColor: this.props.AdminStoriesReducer.bgColor });
  }

  //Displaying each story
  getStoryDetails() {
    return (
      <Media body>
        {_.map(
          _.sortBy(this.props.AdminStoriesReducer.adminStories, [
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
                  backgroundColor: this.props.AdminStoriesReducer.bgColor[index]
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
              </Card>
            );
          }
        )}
      </Media>
    );
  }

  render() {
    //Displaying spinner untill API fetches the data
    if (this.props.AdminStoriesReducer.loading) {
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
    AdminStoriesReducer: state.AdminStoriesReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingApprovalStories);
