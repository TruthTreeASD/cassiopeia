import React, { Component } from 'react';
import {
  Container,
  Row,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

import TimeSeriesView from './TimeSeriesView';

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
    console.log(this.props.selectedAttributes);
    return _.flatMap(this.props.selectedAttributes, elem => {
      return type === 'name' ? elem[1] : elem[0];
    });
  }

  render() {
    let attributes = this.getAttributeNames('name');
    let len = attributes.length;

    let cards = attributes.map((card, index) => {
      console.log('Index is ' + index);
      return (
        <Card sm="8">
          <CardBody>
            <TimeSeriesView index={index} condition="tiny" id={this.props.id} />
          </CardBody>
        </Card>
      );
    });

    if (len == 0) {
      return (
        <Container className="alert">
          {' '}
          Please select minimum of one attribute{' '}
        </Container>
      );
    } else {
      return (
        <Container className="GridContainer">
          <Row> {cards}</Row>
        </Container>
      );
    }
  }
}
const mapState = state => ({
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes
});
export default connect(mapState)(GridTest);
