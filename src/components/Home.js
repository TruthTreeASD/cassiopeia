import React, { Component } from 'react';
import '../styles/Home.css';
import DisplayComponent from './DisplayComponent';
import Header from './Header';
import FilterBy from './FilterBy';
import { connect } from 'react-redux';
import LeftSideBar from './LeftSideBar';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="main">
          <LeftSideBar />
          <FilterBy />
          <DisplayComponent />
        </div>
      </div>
    );
  }
}
const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(Home);
