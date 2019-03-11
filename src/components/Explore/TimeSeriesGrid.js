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
      modal: false,
      locations: {},
      locationIds: [],
      userSelectedLocations: []
    };

    this.modalToggle = this.modalToggle.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.renderLocationList = this.renderLocationList.bind(this);
    this.selectLocations = this.selectLocations.bind(this);
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

  updateLocation(locations, locationIds) {
    this.setState({ locations, locationIds });
  }

  selectLocations(event) {
    let selected = Object.assign([], this.state.userSelectedLocations);
    if (selected.length < 10) {
      let clickedLocation = parseInt(event.target.value);
      if (selected.includes(clickedLocation)) {
        selected = selected.filter(val => {
          return val !== clickedLocation;
        });
      } else {
        selected.push(clickedLocation);
      }
      console.log(event.target.value);
      this.setState({ userSelectedLocations: selected });
    } else {
      alert(
        'Hey please select at most 10 locations. You can still plot this location by dropping any of the selected location!'
      );
    }
  }

  renderLocationList() {
    let locationlist = this.state.locationIds.map(location => {
      return (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={location}
            id="defaultCheck1"
            onClick={this.selectLocations}
          />
          <label className="form-check-label" htmlFor="defaultCheck1">
            {this.state.locations[location].name}
          </label>
        </div>
      );
    });
    return locationlist;
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
          <div style={{ paddingBottom: '10px' }}>
            <Card>
              <CardBody>
                <h6>Select up to 10 locations:</h6>
                {this.renderLocationList()}
              </CardBody>
            </Card>
          </div>
          <Card key={index} sm="8">
            <CardBody className="time-series-card">
              <TimeSeriesView
                index={index}
                condition="tiny"
                id={this.props.id}
                updateLocation={this.updateLocation}
                userSelectedLocations={this.state.userSelectedLocations}
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
                  updateLocation={this.updateLocation}
                  userSelectedLocations={this.state.userSelectedLocations}
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
