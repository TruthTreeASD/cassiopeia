import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import '../styles/Home.css';
import DisplayComponent from './DisplayComponent';
import Header from './Header';
import FilterBy from './FilterBy';
import { connect } from 'react-redux';
import LeftSideBar from './LeftSideBar';
import Filters from './Filters';

class Home extends Component {
  render() {
    return (
      <Row className="flex-grow-1 flex-shrink-1">
        <LeftSideBar />
        <div className="col-12 col-md-10 align-items-center">
          <FilterBy />
          <DisplayComponent />
          <Filters />
        </div>
      </Row>
    );
  }
}
const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(Home);
