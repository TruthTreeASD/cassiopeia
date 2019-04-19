import React, { Component } from 'react';
import { Spinner, Card, Media, Badge, Row, Col, CardHeader } from 'reactstrap';
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
    this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      data: [],
      length: 0,
      bgColor: [],
      searchBoxText: '',
      searchedTags: [],
      loading: true,
      InitialData: [],
      activePage: 1,
      totalItemsCount: 1,
      pageSize: 15,
      selectedSort: 'MOST_UPVOTES'
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
          '&currentPage=1' +
          '&orderType=' +
          this.state.selectedSort
      )
      .then(response => {
        let color = [];
        this.setState({ totalItemsCount: response.data.total });
        for (var i = 0; i < response.data.data.length; i++) {
          color.push('white');
        }
        this.props.dispatch({
          type: 'APPROVED_STORIES_LIST',
          approvedStories: response.data.data,
          approvedStoriesLength: response.data.data.length,
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
          this.props.TrendingStoriesReducer.approvedStories,
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
                <CardHeader className="h5">{data.title}</CardHeader>

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
    this.setState(
      {
        searchBoxText: search
      },
      this.apiCall
    );
  };

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber }, this.apiCall);
  }

  handleSortChange = changeEvent => {
    this.setState({ selectedSort: changeEvent.target.value }, this.apiCall);
  };

  apiCall() {
    if (this.state.searchBoxText === '' || this.state.searchBoxText === null) {
      axios
        .get(
          `${TRUTHTREE_URI}/api/stories?storyStatus=APPROVED&pageSize=` +
            this.state.pageSize +
            '&currentPage=' +
            this.state.activePage +
            '&orderType=' +
            this.state.selectedSort
        )
        .then(response => {
          let color = [];
          this.setState({ totalItemsCount: response.data.total });

          for (var i = 0; i < response.data.data.length; i++) {
            color.push('white');
          }
          this.props.dispatch({
            type: 'APPROVED_STORIES_LIST',
            approvedStories: response.data.data,
            approvedStoriesLength: response.data.data.length,
            color: color,
            userSelectedStory: 'none',
            loading: false
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios //api/stories/search?keyword=colorado&pageSize=10&pageNumber=1
        .get(
          `${TRUTHTREE_URI}/api/stories/search?keyword=` +
            this.state.searchBoxText +
            '&pageSize=' +
            this.state.pageSize +
            '&pageNumber=' +
            this.state.activePage +
            '&orderBy=' +
            this.state.selectedSort
        )
        .then(response => {
          let color = [];
          this.setState({ totalItemsCount: response.data.total });

          for (var i = 0; i < response.data.data.length; i++) {
            color.push('white');
          }
          this.props.dispatch({
            type: 'APPROVED_STORIES_LIST',
            approvedStories: response.data.data,
            approvedStoriesLength: response.data.data.length,
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
          <form>
            <Row className="float-right sorting">
              <Col className="sort-label">{'Sort By: '}</Col>
              <Col className="form-check">
                <label>
                  <input
                    type="radio"
                    name="SORT"
                    value="RECENT"
                    checked={this.state.selectedSort === 'RECENT'}
                    onChange={this.handleSortChange}
                    className="form-check-input"
                  />
                  Recent
                </label>
              </Col>

              <Col className="form-check">
                <label>
                  <input
                    type="radio"
                    name="SORT"
                    value="MOST_UPVOTES"
                    checked={this.state.selectedSort === 'MOST_UPVOTES'}
                    onChange={this.handleSortChange}
                    className="form-check-input"
                  />
                  Upvotes
                </label>
              </Col>
            </Row>
          </form>

          <input
            className="form-control searchBar"
            data-spy="affix"
            onChange={this.handleChangeSearch}
            // onKeyPress={this.handleKeyPressSearch}
            placeholder="Search stories by title or tag name"
          />
          {/* this is a working button in case we want a search button. I removed the css though
          but i can add it back pretty quickly if we wanted it.
               <Button
            className="search-button"
            color="primary"
            onClick={this.submitSearch}
          >
            Search
          </Button>
          <br />
          <br />*/}
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
