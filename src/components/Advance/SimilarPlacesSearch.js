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
  Button,
  Container
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
import { confirmAlert } from 'react-confirm-alert';
import '../../styles/SimilarPlacesSearch.css';

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
  similarLocations: [],
  shouldShowLocationError: false,
  shouldShowNormalizationError: false,
  shouldShowSelectedAttributesError: false,
  shouldShowYearMinError: false,
  shouldShowYearMaxError: false,
  shouldShowYearRangeError: false
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
    if (this.props.selectedAttributes.length > 1) {
      if (
        this.state.normalization.value === null ||
        this.props.selectedAttributes.length === 0 ||
        this.state.yearSelectedMin.value === null ||
        this.props.selected === null
      ) {
        this.setState({
          shouldShowNormalizationError: true,
          shouldShowSelectedAttributesError: true,
          shouldShowYearMinError: true,
          shouldShowLocationError: true
        });

        return false;
      }
    } else {
      if (
        this.state.normalization.value === null ||
        this.props.selectedAttributes.length === 0 ||
        this.state.yearSelectedMin.value === null ||
        this.state.yearSelectedMax.value === null ||
        this.props.selected === null
      ) {
        this.setState({
          shouldShowNormalizationError: true,
          shouldShowSelectedAttributesError: true,
          shouldShowYearMinError: true,
          shouldShowYearMaxError: true,
          shouldShowLocationError: true
        });

        return false;
      }
    }
    if (
      this.state.yearSelectedMin.value !== null &&
      this.state.yearSelectedMax.value !== null
    ) {
      if (this.state.yearSelectedMin.value > this.state.yearSelectedMax.value) {
        this.setState({ shouldShowYearRangeError: true });
        return false;
      } else {
        this.setState({ shouldShowYearRangeError: false });
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
            <small
              className={`${
                this.state.yearSelectedMin.value === null &&
                this.state.shouldShowYearMinError
                  ? ''
                  : 'd-none'
              } text-danger`}
            >
              Year can't be blank
            </small>
            <small
              className={`${
                this.state.yearSelectedMin.value !== null &&
                this.state.shouldShowYearRangeError &&
                this.state.yearSelectedMax.value !== null
                  ? ''
                  : 'd-none'
              } text-danger`}
            >
              Start year greater than end year
            </small>
          </Col>

          {' - '}
          <Col>
            <Select
              value={this.state.yearSelectedMax}
              onChange={this.handleChangeYearMax}
              options={allYears}
            />

            <small
              className={`${
                this.state.yearSelectedMax.value === null &&
                this.state.shouldShowYearMaxError
                  ? ''
                  : 'd-none'
              } text-danger`}
            >
              Year can't be blank
            </small>
          </Col>
        </Row>
      );
    } else {
      return (
        <div>
          <Select
            value={this.state.yearSelectedMin}
            onChange={this.handleChangeYearMin}
            options={allYears}
          />
          <small
            className={`${
              this.state.yearSelectedMin.value === null &&
              this.state.shouldShowYearMinError
                ? ''
                : 'd-none'
            } text-danger`}
          >
            Year can't be blank
          </small>
        </div>
      );
    }
  }
  displayInfo() {
    confirmAlert({
      title: 'Information!',
      message:
        "Based on the filter selections such as attributes, normalization & year, locations with similar trend with that of 'Location Of Interest' will be displayed ",
      buttons: [
        {
          label: 'OK'
        }
      ]
    });
  }
  render() {
    return (
      <Container fluid>
        <Card>
          <CardHeader className="similar-places-card-header">
            <Row>
              <Col className="similar-places-label">Similar Places Search</Col>
              <Col
                className="fa fa-info-circle similar-places-info"
                onClick={() => this.displayInfo()}
              >
                {' '}
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup row>
                <Col lg="2" sm="12" md="2">
                  <Label for="locationOfInterest">
                    <strong>Location of Interest</strong>
                  </Label>
                </Col>
                <Col lg="4" sm="12" md="4" className="advanced-loaction-box">
                  <LocationSearchBox clickable={false} />
                  <small
                    className={`${
                      this.props.selected === null &&
                      this.state.shouldShowLocationError
                        ? ''
                        : 'd-none'
                    } text-danger`}
                  >
                    Location can't be blank
                  </small>
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
                    invalid={
                      this.state.shouldShowNormalizationError &&
                      !this.state.normalization
                    }
                  />

                  <small
                    className={`${
                      !this.state.normalization.value &&
                      this.state.shouldShowNormalizationError
                        ? ''
                        : 'd-none'
                    } text-danger`}
                  >
                    Normalization can't be blank
                  </small>
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
                  <small
                    className={`${
                      this.props.selectedAttributes.length === 0 &&
                      this.state.shouldShowSelectedAttributesError
                        ? ''
                        : 'd-none'
                    } text-danger`}
                  >
                    Attributes can't be blank
                  </small>
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
                <Row className="float-right">
                  <Button
                    className="float-right advanced-search"
                    onClick={this.findSimilarLocations}
                  >
                    <i className="fa fa-search" style={{ padding: '5px' }} />
                    Search
                  </Button>
                  <div style={{ padding: '5px' }} />
                </Row>
              </div>
            </Form>
            <br />
            <SimilarPlacesResponse />
            <br />
          </CardBody>
        </Card>
        <br />

        <br />
        <br />
      </Container>
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
