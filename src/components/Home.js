import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/Home.css';
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  Button
} from 'reactstrap';

import DisplayComponent from './DisplayComponent';
import LeftSideBar from './LeftSideBar';
import YearSelector from './YearSelector';
import AttributeDeselector from './AttributeDeselector';
import Filters from './AttributeRange';
import Tabs from './Explore/Tabs';
import TimeSeriesGrid from './Explore/TimeSeriesGrid';
import StoryCreationComponent from './StoryCreationComponent';

const homeStyle = {
  paddingTop: 75
};

class Home extends Component {
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
      <Container fluid style={homeStyle} className="home">
        <Row>
          <LeftSideBar />

          <div className="col-12 col-md-10 align-items-center padding">
            <Card className="selected-attributes padding">
              <Col>
                {' '}
                <Button
                  className="create-story"
                  color="primary"
                  onClick={this.modalToggle}
                >
                  Create Story
                </Button>{' '}
                <Modal isOpen={this.state.modal} toggle={this.modalToggle}>
                  <ModalBody className="backgroundWhite">
                    <StoryCreationComponent />
                  </ModalBody>
                  <Button color="secondary" onClick={this.modalToggle}>
                    Close
                  </Button>
                </Modal>
              </Col>
              <AttributeDeselector />
            </Card>

            <Card className="right-panel">
              <Tabs>
                <div label="Table View">
                  <DisplayComponent
                    level={this.props.match.params.level}
                    id={this.props.match.params.id}
                    location={this.props.match.params.name}
                  />
                </div>

                <div label="Time Series View">
                  <TimeSeriesGrid
                    id={this.props.match.params.id}
                    level={this.props.match.params.level}
                  />
                </div>
              </Tabs>
            </Card>

            <Card className="bottom-panel">
              <CardHeader className="bottom-panel-header">
                <div>
                  Selected Location: <b>{this.props.match.params.name}</b>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="border-right">
                    <Filters
                      level={this.props.match.params.level}
                      location={this.props.match.params.name}
                      locationId={this.props.match.params.id}
                    />
                  </Col>
                  <Col sm="2" xs="2">
                    <YearSelector />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }
}

export default Home;
