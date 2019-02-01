import React, { Component } from 'react';
import DisplayComponent from './DisplayComponent';
import Header from './Header';
import FilterBy from './FilterBy';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />

        <FilterBy />

        <DisplayComponent />
      </div>
    );
  }
}
const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(Home);
