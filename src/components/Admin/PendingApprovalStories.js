import React, { Component } from 'react';
import { Spinner, Card, Media, Badge, Row } from 'reactstrap';
import _ from 'lodash';
import '../../styles/TrendingStories.css';
import axios from 'axios/index';
import { TRUTHTREE_URI } from '../../constants';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Pagination from 'react-js-pagination';

class PendingApprovalStories extends Component {
  constructor(props) {
    super(props);
    this.getStoryDetails = this.getStoryDetails.bind(this);
    this.selectStory = this.selectStory.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      InitialData: [],
      bgColor: [],
      activePage: 1,
      totalItemsCount: 1,
      pageSize: 10,
      pageRangeDisplayed: 5
    };
  }

  contentHtml(data) {
    return ReactHtmlParser(data);
  }

  componentDidMount() {
    //List of stories to be approved if admin
    axios
      .get(
        `${TRUTHTREE_URI}/api/stories?storyStatus=PENDING&pageSize=` +
          this.state.pageSize +
          '&currentPage=' +
          1
      )
      //Change the api call to unapproved stories
      .then(response => {
        let color = [];
        this.setState({ totalItemsCount: response.data.total });
        for (var i = 0; i < response.data.data.length; i++) {
          color.push('white');
        }
        this.props.dispatch({
          type: 'STORIES_LIST',
          adminStories: response.data.data,
          adminStoriesLength: response.data.data.length,
          bgColor: color,
          adminSelectedStory: 'none',
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    console.log(this.state.searchBoxText);
    axios
      .get(
        `${TRUTHTREE_URI}/api/stories?storyStatus=PENDING&pageSize=` +
          this.state.pageSize +
          '&currentPage=' +
          pageNumber
      )
      .then(response => {
        let color = [];
        //this.setState({totalItemsCount: response.})
        console.log('if condition');
        for (var i = 0; i < response.data.data.length; i++) {
          color.push('white');
        }
        this.props.dispatch({
          type: 'STORIES_LIST',
          adminStories: response.data.data,
          adminStoriesLength: response.data.data.length,
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
          <div>
            <Media className="trending-height">{this.getStoryDetails()}</Media>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.pageSize}
              totalItemsCount={this.state.totalItemsCount}
              pageRangeDisplayed={this.state.pageRangeDisplayed}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
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
