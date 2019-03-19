import React, { Component } from 'react';
import { Container, Card, Row, Col, CardBody, CardHeader } from 'reactstrap';

import '../../styles/StoriesIndex.css';
import ViewStories from './ViewStories';
import TrendingStories from './TrendingStories';

class Stories extends Component {
  render() {
    return (
      <Container className="stories-page">
        <Row>
          <Col className="border-right">
            <ViewStories />
          </Col>
          <Col sm="6" xs="6">
            <TrendingStories />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Stories;
