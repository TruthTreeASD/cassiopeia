import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
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
    let defaultLocations = this.state.userSelectedLocations;
    if (defaultLocations.length === 0) {
      if (locationIds.length > 10) {
        defaultLocations = locationIds.subarray(0, 10);
      } else {
        defaultLocations = locationIds;
      }
    }
    this.setState({
      locations,
      locationIds,
      userSelectedLocations: defaultLocations
    });
  }

  selectLocations(event) {
    let selected = Object.assign([], this.state.userSelectedLocations);
    let clickedLocation = parseInt(event.target.value);
    if (selected.includes(clickedLocation)) {
      selected = selected.filter(val => {
        return val !== clickedLocation;
      });
      this.setState({ userSelectedLocations: selected });
    } else if (selected.length < 10) {
      selected.push(clickedLocation);
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
        <Col
          lg={6}
          md={6}
          className="form-check checkbox checkbox-circle checkbox-yellow"
        >
          <input
            className="form-check-input"
            type="checkbox"
            value={location}
            id="checkbox-input"
            checked={this.state.userSelectedLocations.includes(location)}
            onClick={this.selectLocations}
          />
          <label className="form-check-label" htmlFor="checkbox-input">
            {this.state.locations[location].name}
          </label>
        </Col>
      );
    });
    return <Row className="location-list-padding">{locationlist}</Row>;
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
        <Card key={index}>
          <CardBody className="time-series-card">
            <TimeSeriesView
              index={index}
              condition="tiny"
              id={this.props.id}
              level={this.props.level}
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
          <Row className="padding">
            <Card>
              <CardBody>
                <Row>
                  <Col lg={5}>
                    <Normalization />
                  </Col>
                  <Col>
                    <h6>
                      Select locations falling in population Range(Max 10
                      allowed):
                    </h6>
                    {this.renderLocationList()}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Row>
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
