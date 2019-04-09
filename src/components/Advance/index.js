import React, { Component } from 'react';
import { Container } from 'reactstrap';
import SimilarPlacesSearch from './SimilarPlacesSearch';
const paddingTop = {
  paddingTop: '90px'
};
class Advance extends Component {
  render() {
    return (
      <Container className="stories-page" style={paddingTop}>
        <SimilarPlacesSearch />
      </Container>
    );
  }
}

export default Advance;
