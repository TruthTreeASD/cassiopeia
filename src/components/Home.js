import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../styles/Home.css';
import DisplayComponent from './DisplayComponent';
import { connect } from 'react-redux';
import LeftSideBar from './LeftSideBar';
import YearSelection from './YearSelection.js';
import Filters from './AttributeRange.js';

class Home extends Component {
  render() {
    return (
      <Row className="flex-grow-1 flex-shrink-1">
        <LeftSideBar />
        <div className="col-12 col-md-10 align-items-center">
          <DisplayComponent />
          <Row className="align-items-center">
            <Col sm={{ size: 6, order: 1, offset: 1 }}>
              <Filters />
            </Col>
            <Col sm={{ size: 4, order: 2, offset: 0 }}>
              <YearSelection />
            </Col>
          </Row>
        </div>
      </Row>
    );
  }
}
const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(Home);
