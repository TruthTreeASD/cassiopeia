import React, { Component } from 'react';
import { Spinner, Card, Media, Badge, Row, Button } from 'reactstrap';
import _ from 'lodash';
import '../../styles/TrendingStories.css';

import axios from 'axios/index';
import { TRUTHTREE_URI } from '../../constants';
import { connect } from 'react-redux';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from 'react-html-parser';

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
      bgColor: [],
      searchBoxText: '',
      loading: true
    };
  }

  contentHtml(data) {
    return ReactHtmlParser(data);
  }

  componentDidMount() {
    axios
      .get(`${TRUTHTREE_URI}/api/stories/approved`)
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
              return o.upvote - o.downvote;
            }
          ]).reverse(),
          (data, index) => {
            return (
              <Card
                className="pointer"
                onClick={() => this.selectStory(data, index)}
                style={{ backgroundColor: this.state.bgColor[index] }}
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
                <Row className="trending">
                  <i
                    onClick={this.handleUpVoteClick(data)}
                    class="fa fa-thumbs-o-up thumb"
                  >
                    {' '}
                    {data.upvote}{' '}
                  </i>
                  <i
                    onClick={this.handleDownVoteClick(data)}
                    class="fa fa-thumbs-o-down thumb"
                  >
                    {' '}
                    {data.downvote}{' '}
                  </i>
                </Row>
              </Card>
            );
          }
        )}
      </Media>
    );
  }

  handleChangeSearch = event => {
    this.setState({ searchBoxText: event });
  };
  handleKeyPressSearch = key => {
    if (key.key == 'Enter') {
      this.submitSearch(this.state.data);
    }
  };
  submitSearch = event => {
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
    const { loading } = this.state;
    if (loading) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner className="align-self-center" color="secondary" size="sm" />
        </div>
      );
    } else {
      return (
        <div>
          <input
            className="form-control searchBar"
            data-spy="affix"
            onChange={this.handleChangeSearch}
            onKeyPress={this.handleKeyPressSearch}
            placeholder="Search stories by title or tag name"
          />
          <Button
            className="search-button"
            color="primary"
            onClick={this.submitSearch}
          >
            Search
          </Button>
          <br />
          <br />
          <div>
            <Media className="trending-height">{this.getStoryDetails()}</Media>
          </div>
        </div>
      );
    }
  }
}
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(TrendingStories);
