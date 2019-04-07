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
      data: [],
      length: 0,
      bgColor: [],
      searchBoxText: '',
      searchedTags: [],
      loading: true,
      InitialData: []
    };
  }

  contentHtml(data) {
    return ReactHtmlParser(data);
  }

  componentDidMount() {
    //List of approved stories if not admin
    axios
      .get(`${TRUTHTREE_URI}/api/stories?storyStatus=APPROVED`)
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
  filterOutStories = stories => {};

  handleChangeSearch = event => {
    let search = event.target.value.toLowerCase();
    search = search.replace('\\', '');
    search = search.replace('*', '');
    this.setState({
      searchBoxText: search,
      searchedTags: _.split(search, ' ', 9999)
    });
    this.submitSearch(this.state.data);
  };
  handleKeyPressSearch = key => {
    if (key.key === 'Enter') {
      this.submitSearch(...this.state.searchedTags, this.state.searchBoxText);
    }
  };
  submitSearch = event => {
    //api call for tags filterred by searchedTags here

    axios
      .get(`${TRUTHTREE_URI}/api/stories`) // + this.state.searchBoxText or something
      .then(response => {
        this.setState({
          data: response.data,
          length: response.data.length,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ searchBoxText: '' });
  };

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
            onKeyPress={this.handleKeyPressSearch}
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
