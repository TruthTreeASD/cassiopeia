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
  ModalFooter,
  ModalHeader,
  Button
} from 'reactstrap';

import '../../styles/StoriesIndex.css';
import ViewStories from './ViewStories';
import TrendingStories from './TrendingStories';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import StoryCreationComponent from '../StoryCreationComponent';

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openStory: false
    };

    this.modalToggle = this.modalToggle.bind(this);
  }

  //Here is the issue: I'd like to update the openStory to "false" when a person submits
  //a story from the StorCreationComponent.
  componentWillReceiveProps(nextProps) {
    console.log('it worked');
    //this.setState({ openStory: nextProps.openStory });
  }

  modalToggle() {
    this.setState({
      openStory: !this.state.openStory
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
                <Modal isOpen={this.state.openStory} toggle={this.modalToggle}>
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
