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
              We seek to unite all the public data in the world into a data
              visualization tool and reference platform that can facilitate data
              driven understanding regarding geography, politics, and culture
              for geographical entities at all scales. &nbsp;
              <Link to="/about">Find out more</Link>
            </Typist>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default IntroHeading;
