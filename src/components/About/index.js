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
            <p className="justify-content-between">
              TruthTree.wiki is an open source platform that provides tools and
              services to users for exploring, creating, and then sharing
              user-generated data visualization stories. The first phase of this
              project concentrates on Local Government spending in the United
              States for three different entity types: state, county, and city.
            </p>
            <p className="justify-content-between">
              Our long term goal is to expand the platform worldwide, ingesting
              and activating all available public data about all geographic
              regions at as many scales as possible.
            </p>
            <p className="justify-content-between">
              The next phase of the project will ingest satellite-derived
              population, income, bioregion, and carbon emissions data of sub
              national regions in order to enable cross-national analysis at
              local scale.
            </p>
          </p>
          <p className="lead" />
        </Jumbotron>
      </Container>
    );
  }
}

export default About;
