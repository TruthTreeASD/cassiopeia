import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import '../../styles/StoriesIndex.css';
import TrendingStoryDetail from './TrendingStoryDetail';
import TrendingStories from './TrendingStories';
import 'react-confirm-alert/src/react-confirm-alert.css';

const mobileStyle = 800;

class Stories extends Component {
  render() {
    const { selectedStory } = this.props;
    console.log(this.props);
    const shouldShowStories = selectedStory === 'none';
    const trendingStoriesClassName = selectedStory ? 'd-none' : '';
    return (
      <Container className="stories-page">
        <TrendingStories className={trendingStoriesClassName} />
        <TrendingStoryDetail />
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  selectedStory: store.TrendingStoriesReducer.userSelectedStory
});

export default connect(mapStateToProps)(Stories);
