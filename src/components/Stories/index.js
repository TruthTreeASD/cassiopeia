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
import { confirmAlert } from 'react-confirm-alert';
import StoryCreationComponent from '../StoryCreationComponent';

class Stories extends Component {
  constructor(props) {
    super(props);
  }

  popUpStoryComponent() {
    confirmAlert({
      buttons: [],
      childrenElement: () => {
        return (
          <div>
            This area works
            {/*this does not <StoryCreationComponent/>*/}
          </div>
        );
      }
    });
  }
  render() {
    return (
      <Container className="stories-page">
        <Card>
          <CardHeader>
            <Row>
              <Col>Trending Stories </Col>
              <Col>
                {' '}
                <Button
                  className="create-story"
                  color="primary"
                  onClick={() => this.popUpStoryComponent()}
                >
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
