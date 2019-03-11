import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';
import '../../styles/About.css';

const aboutStyle = {
  paddingTop: 70
};

class About extends Component {
  render() {
    return (
      <Container fluid style={aboutStyle} className="about">
        <Jumbotron className="float-center">
          <h1 className="text-primary">TruthTree</h1>
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
