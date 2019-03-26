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
  Button
} from 'reactstrap';
import Select from 'react-select';

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

let numberOfLocationsList = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '1' }
];

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

  render() {
    return (
      <Card>
        <CardHeader>Search for locations with similar trend</CardHeader>
        <CardBody>
          <Form>
            <FormGroup row>
              <Label for="locationOfInterest">Location of Interest:</Label>
              <Col>
                <Input
                  id="locationOfInterest"
                  placeholder="Search for location"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="selectedAttribues">Selected attributes :</Label>
              <Col>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChangeAttribute}
                  options={options}
                  isMulti="true"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="numberOfLocations">
                {' '}
                Number of similar locations:
              </Label>
              <Col xs="1">
                <Select
                  value={this.state.numberOfLocations}
                  onChange={this.handleChangeNumber}
                  options={numberOfLocationsList}
                />
              </Col>

              <Label for="normalizationType"> Normalization :</Label>
              <Col xs="2">
                <Select
                  value={this.state.normalization}
                  onChange={this.handleChangeNormalization}
                  options={normalizationList}
                />
              </Col>

              <Label for="year">Year:</Label>
              <Col xs="1">
                {' '}
                <Select
                  value={this.state.yearSelectedMin}
                  onChange={this.handleChangeYearMin}
                  options={allYears}
                />{' '}
              </Col>
            </FormGroup>

            <Button className="float-right">Search</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default SimilarPlacesSearch;
