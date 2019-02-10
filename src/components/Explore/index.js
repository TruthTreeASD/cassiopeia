import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import LocationSearchBox from './LocationSearchBox';

class Explore extends Component {
  render() {
    return (
      <Row className="my-3">
        <Col xs={3} />
        <Col xs={6}>
          <LocationSearchBox />
        </Col>
        <Col xs={3} />
      </Row>
    );
  }
}

export default Explore;
