import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import LocationSearchBox from './LocationSearchBox';
import IntroHeading from './IntroHeading';

const introContainerStyle = {
  marginBottom: '12em',
  backgroundColor: 'rgba(13, 22, 38, 0.7)'
};

class Intro extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col
            style={introContainerStyle}
            xs={12}
            sm={11}
            md={9}
            lg={6}
            className="py-3 px-4"
          >
            <IntroHeading />
            <LocationSearchBox />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Intro;
