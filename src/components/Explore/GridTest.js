import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import TimeSeriesChartTiny from './TimeSeriesChartTinyView';
import TimeSeriesChart from './TimeSeriesChart';
import '../../styles/TimeSeries.css';

class GridTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      data: [
        { year: '1967', location1: 400, location2: 1200, location0: 200 },
        { year: '1969', location1: 200, location2: 2400, location0: 100 },
        { year: '1971', location1: 700, location2: 2000, location0: 50 },
        { year: '1973', location1: 300, location2: 3000, location0: 25 },
        { year: '1975', location1: 300, location2: 3000, location0: 25 },
        { year: '1977', location1: 300, location2: 3000, location0: 25 },
        { year: '1979', location1: 300, location2: 3000, location0: 25 },
        { year: '1981', location1: 300, location2: 3000, location0: 25 },
        { year: '1983', location1: 300, location2: 3000, location0: 25 },
        { year: '1985', location1: 300, location2: 3000, location0: 25 },
        { year: '1987', location1: 300, location2: 3000, location0: 25 },
        { year: '1989', location1: 300, location2: 3000, location0: 25 }
      ],
      locations: [
        { id: 'location0', name: 'location0', color: 'red' },
        { id: 'location1', name: 'location1', color: 'blue' },
        { id: 'location2', name: 'location2', color: 'purple' }
      ],
      modal: false
    };

    this.modalToggle = this.modalToggle.bind(this);
  }

  modalToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <Container className="GridContainer">
        <Row>
          <Col xs="6">
            <Card>
              <CardBody>
                <TimeSeriesChartTiny
                  data={this.state.data}
                  attributeName="Population"
                  locations={this.state.locations}
                />
                <Button color="danger" onClick={this.modalToggle}>
                  Expand
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.modalToggle}
                  className="GridModal"
                >
                  <ModalHeader toggle={this.modalToggle}>
                    Modal title
                  </ModalHeader>
                  <ModalBody>
                    <TimeSeriesChart
                      data={this.state.data}
                      attributeName="Population"
                      locations={this.state.locations}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.modalToggle}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </CardBody>
            </Card>
          </Col>

          <Col xs="6">
            <Card>
              <CardBody>
                <TimeSeriesChartTiny
                  data={this.state.data}
                  attributeName="Population"
                  locations={this.state.locations}
                />
                <Button>Button</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <Card>
              <CardBody>
                <TimeSeriesChartTiny
                  data={this.state.data}
                  attributeName="Population"
                  locations={this.state.locations}
                />
                <Button>Button</Button>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card>
              <CardBody>
                <TimeSeriesChartTiny
                  data={this.state.data}
                  attributeName="Population"
                  locations={this.state.locations}
                />
                <Button>Button</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GridTest;
