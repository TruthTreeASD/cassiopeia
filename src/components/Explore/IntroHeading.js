import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Typist from 'react-typist';
import { Link } from 'react-router-dom';

const introHeadingStyle = {
  color: 'white'
};

class IntroHeading extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col style={introHeadingStyle}>
            <h1 className="text-primary">Welcome to TruthTree</h1>
            <Typist avgTypingDelay={20} cursor={{ hideWhenDone: true }}>
              We're an open source data visualization project that focuses on
              U.S government financial spending. &nbsp;
              <Link to="/about">Find out more</Link>
            </Typist>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default IntroHeading;
