import React, { Component } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Button
} from 'reactstrap';

import '../../styles/StoriesIndex.css';
import ViewStories from './ViewStories';
import TrendingStories from './TrendingStories';

class Stories extends Component {
  render() {
    return (
      <Container className="stories-page">
        <Card>
          <CardHeader className="trending-card">
            <Row>
              <Col className="trending-label">Trending Stories </Col>
              <Col>
                {' '}
                <Button className="create-story" color="primary">
                  Create Story
                </Button>{' '}
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col className="border-right">
                <TrendingStories />
              </Col>
              <Col>
                <ViewStories />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Stories;
