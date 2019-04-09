import React, { Component } from 'react';
import {
  FormGroup,
  Form,
  Label,
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Button
} from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import LocationSearchBox from '../Explore/LocationSearchBox';
import CommonAttributes from './CommonAttributes';
import SimilarPlacesResponse from './SimilarPlacesResponse';
import axios from 'axios/index';
import { TRUTHTREE_URI } from '../../constants';
import { updateLocations } from '../../actions/SimilarLocationsActions';
import { emptyAttributesList } from '../../actions/CommonAttributesActions';
import { emptyLocationsList } from '../../actions/LocationSearchBoxActions';

let allYears = [];
for (let i = 2016; i > 1966; i--) {
  allYears.push({
    value: i,
    label: i
  });
}

const normalizationList = [
  { value: 'PER_CAPITA', label: 'By Population' },
  { value: 'BY_REVENUE', label: 'By Revenue' }
];

const colors = [
  'red',
  'purple',
  'green',
  'blue',
  'deeppink',
  'orange',
  'navy',
  'slategray',
  'indianred',
  'dimgrey'
];

const initialValues = {
  selectedAttributes: null,
  numberOfLocations: { value: '1', label: '1' },
  normalization: { value: null, label: 'Please Select' },
  yearSelectedMin: { value: null, label: 'Start Year' },
  yearSelectedMax: { value: null, label: 'End Year' },
  similarLocations: []
};

class SimilarPlacesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = initialValues;
    this.handleChangeAttribute = this.handleChangeAttribute.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeYearMin = this.handleChangeYearMin.bind(this);
    this.handleChangeYearMax = this.handleChangeYearMax.bind(this);
    this.findSimilarLocations = this.findSimilarLocations.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChangeAttribute = selectedAttributes => {
    this.setState({ selectedAttributes });
  };

  handleChangeNumber = numberOfLocations => {
    this.setState({ numberOfLocations });
  };

  handleChangeNormalization = normalization => {
    this.setState({ normalization });
  };

  handleChangeYearMin = yearSelectedMin => {
    this.setState({ yearSelectedMin });
  };
  handleChangeYearMax = yearSelectedMax => {
    this.setState({ yearSelectedMax });
  };

  findSimilarLocations() {
    if (!this.validateInputs()) {
      return;
    }
    let locationId = this.props.selected.id;
    let place_type = this.props.selected.typeCode;
    let normalizationType = this.state.normalization.value;
    let attributes = this.props.selectedAttributes[0].value;
    let year = this.state.yearSelectedMin.value;
    if (this.props.selectedAttributes.length > 1) {
      for (let i = 1; i < this.props.selectedAttributes.length; i++) {
        attributes = attributes + ',' + this.props.selectedAttributes[i].value;
      }
    } else {
      year = year + ',' + this.state.yearSelectedMax.value;
    }
    axios
      .get(
        `${TRUTHTREE_URI}/api/similarlocations?` +
          `locationId=` +
          locationId +
          `&place_type=` +
          place_type +
          `&attribute=` +
          attributes +
          `&year=` +
          year +
          `&normalize_by=` +
          normalizationType
      )
      .then(response => {
        let similarLocations = response.data;
        similarLocations.map((resp, i) => {
          similarLocations[i].color = colors[i];
        });
        this.setState({ similarLocations: similarLocations });
        this.props.dispatch(updateLocations(similarLocations));
      })
      .catch(error => {
        console.log(error);
      });
  }

  validateInputs() {
    if (
      this.props.selected === undefined ||
      this.props.selected.id === undefined ||
      this.state.normalization.value === undefined ||
      this.state.yearSelectedMin.value === null ||
      this.props.selectedAttributes.length < 2
    ) {
      if (
        (this.props.selectedAttributes.length === 1 &&
          this.state.yearSelectedMax.value === null) ||
        this.props.selectedAttributes.length < 1
      ) {
        alert('Please select all values');
        return false;
      }
    }
    return true;
  }

  reset() {
    this.setState(initialValues);
    this.props.dispatch(emptyAttributesList());
    this.props.dispatch(emptyLocationsList());
  }

  componentDidMount() {}

  renderYearInput() {
    if (this.props.selectedAttributes.length < 2) {
      return (
        <Row>
          <Col>
            <Select
              value={this.state.yearSelectedMin}
              onChange={this.handleChangeYearMin}
              options={allYears}
            />
          </Col>
          {' - '}
          <Col>
            <Select
              value={this.state.yearSelectedMax}
              onChange={this.handleChangeYearMax}
              options={allYears}
            />
          </Col>
        </Row>
      );
    } else {
      return (
        <Select
          value={this.state.yearSelectedMin}
          onChange={this.handleChangeYearMin}
          options={allYears}
        />
      );
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Card>
          <CardHeader>
            <h5>Similar Places Search</h5>
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Col lg="2" sm="12" md="2">
                  <Label for="locationOfInterest">
                    <strong>Location of Interest</strong>
                  </Label>
                </Col>
                <Col lg="4" sm="12" md="4">
                  <LocationSearchBox clickable={false} />
                </Col>
                <Col lg="2" sm="12" md="2">
                  <Label for="normalizationType">
                    <strong>Normalization</strong>
                  </Label>
                </Col>
                <Col lg="4" sm="12" md="4">
                  <Select
                    value={this.state.normalization}
                    onChange={this.handleChangeNormalization}
                    options={normalizationList}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col lg="2" sm="12" md="2">
                  <Label for="selectedAttribues">
                    <strong>Selected attributes</strong>
                  </Label>
                </Col>
                <Col lg="4" sm="12" md="4">
                  <CommonAttributes />
                </Col>
                <Col lg="2" sm="12" md="2">
                  <Label for="year">
                    <strong>Year</strong>
                  </Label>
                </Col>
                <Col lg="4" sm="12" md="4">
                  {this.renderYearInput()}
                </Col>
              </FormGroup>

              <div style={{ paddingTop: '10px' }}>
                <Row className="justify-content-center">
                  <Button
                    className="float-right"
                    onClick={this.findSimilarLocations}
                  >
                    <i className="fa fa-search" style={{ padding: '5px' }} />
                    Search
                  </Button>
                  <div style={{ padding: '2px' }} />

                  <Button className="float-right" onClick={this.reset}>
                    <i className="fa fa-refresh" style={{ padding: '5px' }} />
                    Reset
                  </Button>
                </Row>
              </div>
            </Form>
          </CardBody>
        </Card>
        <br />
        <SimilarPlacesResponse />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedAttributes: state.CommonAttributesReducer.selectedAttributes,
    selected: state.LocationSearchBoxReducer.selected
  };
};

export default connect(mapStateToProps)(SimilarPlacesSearch);
