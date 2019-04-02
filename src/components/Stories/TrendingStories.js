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
    this.handleUpVoteClick = this.handleUpVoteClick.bind(this);
    this.handleDownVoteClick = this.handleDownVoteClick.bind(this);
    this.selectStory = this.selectStory.bind(this);
    this.state = {
      data: [],
      length: 0,
      bgColor: [],
      loading: true
    };
  }

  contentHtml(data) {
    return ReactHtmlParser(data);
  }

  componentDidMount() {
    //List of approved stories if not admin
    {
      !this.props.admin &&
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

    //List of stories to be approved if admin
    {
      this.props.admin &&
        axios
          .get(`${TRUTHTREE_URI}/api/stories/pending`)
          //Change the api call to unapproved stories
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
  }

  handleUpVoteClick(data) {
    data.upvotes++;
    //api call to change data
  }

  handleDownVoteClick(data) {
    data.downvotes++;
    //api call to change data
  }

  //Highlighting the selected story panel & storing its details in redux
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

  //Displaying each story
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
    const { loading } = this.state;
    //Displaying spinner untill API fetches the data
    if (loading) {
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

export default connect(mapDispatchToProps)(TrendingStories);
