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
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}

  modalToggle() {
    this.setState({
      modal: !this.state.modal
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
                <Button className="create-story" color="primary">
                  Create Story
                </Button>{' '}
                <Modal
                  isOpen={state.modal}
                  toggle={modalToggle}
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
