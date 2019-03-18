import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Badge
} from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { confirmAlert } from 'react-confirm-alert';
import domtoimage from 'dom-to-image';

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
    this.ImageCapture = this.ImageCapture.bind(this);
  }

  ImageCapture = () => {
    var newRef = this.refs.image;
    const fileName = this.attrId;
    console.log(fileName);
    domtoimage
      .toJpeg(newRef, { quality: 1 })
      .then(function(dataUrl) {
        var link = document.createElement('a');
        link.download = 'TruthTree.jpeg';
        link.href = dataUrl;
        link.click();
      })
      .catch(function(error) {
        console.error('oops, something went wrong!', error);
      });
  };
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
        defaultLocations = locationIds.slice(0, 10);
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
      confirmAlert({
        title: 'Error!',
        message:
          'Number of selected locations exceeded limit of 10, please remove existing location to add more.',
        buttons: [
          {
            label: 'OK'
          }
        ]
      });
    }
  }

  renderLocationList() {
    let locationlist = this.state.locationIds.map(location => {
      return (
        <Col
          sm="3"
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
          <Row>
            <Card>
              <CardBody>
                <Row>
                  <Normalization />
                </Row>
                <hr />
                <Row className="SelectedLocations">
                  <i>
                    Select locations from the selected range to be plotted in
                    the graph:{' '}
                  </i>
                  {this.renderLocationList()}
                </Row>
              </CardBody>
            </Card>
          </Row>
          <Row>
            {' '}
            <div className="Space" />
          </Row>
          <Row>
            {cards}
            <Modal
              isOpen={this.state.modal}
              toggle={this.modalToggle}
              className="GridModal"
            >
              <div ref="image">
                <ModalBody className="backgroundWhite">
                  <TimeSeriesView
                    index={this.state.modalAttrIndex}
                    condition="large"
                    id={this.props.id}
                    updateLocation={this.updateLocation}
                    userSelectedLocations={this.state.userSelectedLocations}
                    level={this.props.level}
                  />
                </ModalBody>
              </div>
              <ModalFooter>
                <Button color="secondary" onClick={this.ImageCapture}>
                  Download
                </Button>
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
