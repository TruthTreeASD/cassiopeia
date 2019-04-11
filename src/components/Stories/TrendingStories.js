import React, { Component } from 'react';
import { Spinner, Card, Media, Badge, Row } from 'reactstrap';
import _ from 'lodash';
import '../../styles/TrendingStories.css';

import axios from 'axios/index';
import { TRUTHTREE_URI } from '../../constants';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Pagination from 'react-js-pagination';

class TrendingStories extends Component {
  constructor(props) {
    super(props);
    this.getStoryDetails = this.getStoryDetails.bind(this);
    this.selectStory = this.selectStory.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      data: [],
      length: 0,
      bgColor: [],
      searchBoxText: '',
      searchedTags: [],
      loading: true,
      InitialData: [],
      activePage: 1,
      totalItemsCount: 50,
      pageSize: 3
    };
  }

  contentHtml(data) {
    return ReactHtmlParser(data);
  }

  componentDidMount() {
    //List of approved stories if not admin
    axios
      .get(
        `${TRUTHTREE_URI}/api/stories?storyStatus=APPROVED&pageSize=` +
          this.state.pageSize +
          '&currentPage=1'
      )
      .then(response => {
        let color = [];
        //console.log(response);
        //this.setState({totalItemsCount: response.})
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

  handleChangeSearch = event => {
    let search = event.target.value.toLowerCase();
    search = search.replace('\\', '');
    search = search.replace('*', '');
    this.setState({
      searchBoxText: search
    });

    console.log('in handle change search');
    if (search === '') {
      axios
        .get(
          `${TRUTHTREE_URI}/api/stories?storyStatus=APPROVED&pageSize=` +
            this.state.pageSize +
            '&currentPage=' +
            this.state.activePage
        )
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
    } else {
      this.submitSearch(search);
    }
  };

  submitSearch = search => {
    //api call for tags filterred by searchedTags here
    console.log('in submit search');
    axios
      .get(
        `${TRUTHTREE_URI}/api/stories/search?keyword=` +
          search +
          '&pageSize=' +
          this.state.pageSize +
          '&pageNumber=' +
          this.state.activePage
      )
      .then(response => {
        let color = [];
        for (var i = 0; i < response.data.length; i++) {
          color.push('white');
        }
        this.props.dispatch({
          type: 'APPROVED_STORIES_LIST', //could change, but works well now.
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
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    console.log(this.state.searchBoxText);
    if (this.state.searchBoxText === '' || this.state.searchBoxText === null) {
      axios
        .get(
          `${TRUTHTREE_URI}/api/stories?storyStatus=APPROVED&pageSize=` +
            this.state.pageSize +
            '&currentPage=' +
            pageNumber
        )
        .then(response => {
          let color = [];
          //this.setState({totalItemsCount: response.})
          console.log('if condition');
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
    //Dislaying list of stories + search box
    else {
      return (
        <div>
          <input
            className="form-control searchBar"
            data-spy="affix"
            onChange={this.handleChangeSearch}
            // onKeyPress={this.handleKeyPressSearch}
            placeholder="Search stories by title or tag name"
          />
          <div>
            <Media className="trending-height">{this.getStoryDetails()}</Media>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.pageSize}
              totalItemsCount={this.state.totalItemsCount}
              pageRangeDisplayed={5}
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
    TrendingStoriesReducer: state.TrendingStoriesReducer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendingStories);
