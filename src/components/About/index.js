import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import '../../styles/About.css';

class About extends Component {
  render() {
    return (
      <Container fluid className="about">
        <Jumbotron className="float-center">
          <h1 className="display-3">TruthTree</h1>
          <p>A Public Data Vizipedia/Wiki-Laboratory</p>
          <hr className="my-2" />
          <p className="lead">
            TruthTree seeks to unite all the public data in the world into a
            data-visualization tool and reference platform that can facilitate
            data-driven understanding and consensus regarding geography,
            politics, and culture for geographical entities at all scales.
          </p>
          <p className="lead" />
        </Jumbotron>
      </Container>
    );
  }
}

export default About;