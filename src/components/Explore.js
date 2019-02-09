import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class LocationSearchBox extends Component {
  render() {
    return <input />;
  }
}

class Explore extends Component {
  render() {
    return (
      <Row>
        <Col>
          <LocationSearchBox />
        </Col>
      </Row>
    );
  }
}

export default Explore;
