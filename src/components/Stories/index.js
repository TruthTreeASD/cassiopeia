import React, { Component } from 'react';
import {
  Container,
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  Button
} from 'reactstrap';

import '../../styles/StoriesIndex.css';
import ViewStories from './ViewStories';
import TrendingStories from './TrendingStories';
import 'react-confirm-alert/src/react-confirm-alert.css';

import StoryCreationComponent from '../StoryCreationComponent';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.modalToggle = this.modalToggle.bind(this);
  }

  modalToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Container className="stories-page">
        <Card>
          <CardHeader className="trending-card">
            <Row>
              <Col className="trending-label">Trending Stories </Col>
              <Col>
                {' '}
                <Button
                  className="create-story"
                  color="primary"
                  onClick={this.modalToggle}
                >
                  Create Story
                </Button>{' '}
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.modalToggle}
                  //className="GridModal"
                >
                  <ModalBody className="backgroundWhite">
                    <StoryCreationComponent />
                  </ModalBody>
                  <Button color="secondary" onClick={this.modalToggle}>
                    Close
                  </Button>
                </Modal>
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
