import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import Map from './Map';
import LocationSearchBox from './LocationSearchBox';

const exploreStyle = {
  flex: '1 1 auto'
};

const searchBoxWrapperStyle = {
  zIndex: 99
};

class Explore extends Component {
  render() {
    return (
      <div className="position-relative" style={exploreStyle}>
        <Container
          fluid
          className="position-absolute my-3"
          style={searchBoxWrapperStyle}
        >
          <Row className="justify-content-center">
            <Col xs={6}>
              <LocationSearchBox />
            </Col>
          </Row>
        </Container>
        <Map />
      </div>
    );
  }
}

export default Explore;
