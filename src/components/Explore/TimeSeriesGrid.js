import React, { Component } from 'react';
import {
  Container,
  Row,
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Badge
} from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

import TimeSeriesView from './TimeSeriesView';
import Normalization from './Normalization';

import '../../styles/TimeSeries.css';

class GridTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.modalToggle = this.modalToggle.bind(this);
  }

  modalToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  getAttributeNames(type) {
    return _.flatMap(this.props.selectedAttributes, elem => {
      return type === 'name' ? elem[1] : elem[0];
    });
  }

  handExpandClick = attrId =>
    this.setState({
      modal: true,
      modalAttrIndex: attrId
    });

  render() {
    let attributes = this.getAttributeNames('name');
    let len = attributes.length;

    let cards = attributes.map((card, index) => {
      return (
        <div>
          <Card key={index} sm="8">
            <CardBody className="time-series-card">
              <TimeSeriesView
                index={index}
                condition="tiny"
                id={this.props.id}
                level={this.props.level}
              />
              <Button
                className="button"
                color="secondary"
                onClick={() => this.handExpandClick(index)}
              >
                <Badge>Expand</Badge>
              </Button>
            </CardBody>
          </Card>
        </div>
      );
    });

    if (len === 0) {
      return (
        <Container className="alert">
          {' '}
          Please select minimum of one attribute{' '}
        </Container>
      );
    } else {
      return (
        <Container className="GridContainer">
          <Normalization />
          <Row>
            {cards}
            <Modal
              isOpen={this.state.modal}
              toggle={this.modalToggle}
              className="GridModal"
            >
              <ModalBody>
                <TimeSeriesView
                  index={this.state.modalAttrIndex}
                  condition="large"
                  id={this.props.id}
                  level={this.props.level}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.modalToggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Row>
        </Container>
      );
    }
  }
}
const mapState = state => ({
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes
});
export default connect(mapState)(GridTest);
