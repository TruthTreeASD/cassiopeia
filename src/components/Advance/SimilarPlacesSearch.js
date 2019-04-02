import React, { Component } from 'react';
import {
  FormGroup,
  Form,
  Label,
  Input,
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardSubtitle,
  Button
} from 'reactstrap';
import Select from 'react-select';
import LocationSearchBox from '../Explore/LocationSearchBox';

const options = [
  { value: 'Income_Taxes_Total', label: 'Income Taxes - Total' },
  {
    value: 'Long_Term_Dept_Outstanding_Total',
    label: 'Long Term Dept Outstanding - Total'
  },
  { value: 'Hospital_Total_Expenditure', label: 'Hospital - Total Expenditure' }
];

let allYears = [];
for (let i = 2016; i > 1966; i--) {
  allYears.push({
    value: i,
    label: i
  });
}

const normalizationList = [
  { value: 'Gross', label: 'Gross' },
  { value: 'ByPopulation', label: 'By Population' },
  { value: 'ByRevenue', label: 'By Revenue' }
];

class SimilarPlacesSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: null,
      numberOfLocations: { value: '1', label: '1' },
      normalization: { value: 'Gross', label: 'Gross' },
      yearSelectedMin: { value: '2016', label: '2016' },
      yearSelectedMax: { value: '2016', label: '2016' }
    };
    this.handleChangeAttribute = this.handleChangeAttribute.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeYearMin = this.handleChangeYearMin.bind(this);
    this.handleChangeYearMax = this.handleChangeYearMax.bind(this);
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

  componentDidMount() {}

  render() {
    return (
      <Card>
        <CardHeader>
          <h5>Similar locations Search</h5>
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
                <LocationSearchBox />
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
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChangeAttribute}
                  options={options}
                  isMulti="true"
                />
              </Col>
              <Col lg="2" sm="12" md="2">
                <Label for="year">
                  <strong>Year</strong>
                </Label>
              </Col>
              <Col lg="4" sm="12" md="4">
                <Select
                  value={this.state.yearSelectedMin}
                  onChange={this.handleChangeYearMin}
                  options={allYears}
                />
              </Col>
            </FormGroup>

            <div style={{ paddingTop: '10px' }}>
              <FormGroup row className="justify-content-center">
                <Button className="float-right">
                  <i className="fa fa-search" style={{ padding: '5px' }} />
                  Search
                </Button>
              </FormGroup>
            </div>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default SimilarPlacesSearch;
