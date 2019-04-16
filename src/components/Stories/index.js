import React, { Component } from 'react';
import { Container, Card, Row, Col, CardBody, CardHeader } from 'reactstrap';

import '../../styles/StoriesIndex.css';
import ViewStories from './TrendingStoryDetail';
import TrendingStories from './TrendingStories';
import 'react-confirm-alert/src/react-confirm-alert.css';

const mobileStyle = 800;

class Stories extends Component {
  render() {
    return (
      <Container className="stories-page">
        <Card>
          <CardHeader className="trending-card">
            <Row>
              <Col className="trending-label">Trending Stories </Col>
            </Row>
          </CardHeader>
          <CardBody>
            {window.innerWidth <= mobileStyle && (
              <Col className="trending-stories-overflow">
                <ViewStories />
              </Col>
            )}
            <Row>
              <Col className="border-right">
                <TrendingStories />
              </Col>
              {window.innerWidth > mobileStyle && (
                <Col className="trending-stories-overflow">
                  <ViewStories />
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Stories;
