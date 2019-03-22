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

class SimilarPlacesSearch extends Component {
  render() {
    return (
      <Card>
        <CardHeader>Search for locations with similar trend</CardHeader>

        <CardBody>
          <Form>
            <FormGroup row>
              <Label for="locationOfInterest" xs="2">
                Location of Interest:
              </Label>
              <Col xs="auto">
                <Input
                  id="locationOfInterest"
                  placeholder="Search for location"
                  bsSize="sm"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" xs="2">
                Number of similar locations:
              </Label>
              <Col xs="auto">
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  bsSize="sm"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" xs="2">
                Normalization :
              </Label>
              <Col xs="auto">
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  bsSize="sm"
                >
                  <option>By Population</option>
                  <option>By Revenue</option>
                  <option>Gross</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" xs="2">
                Year Range :
              </Label>
              <Col xs="auto">
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  bsSize="sm"
                >
                  <option>2016</option>
                  <option>2015</option>
                  <option>2014</option>
                </Input>
              </Col>
              <Col xs="auto"> - </Col>
              <Col xs="auto">
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  bsSize="sm"
                >
                  <option>2016</option>
                  <option>2015</option>
                  <option>2014</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleSelect" xs="2">
                Selected attributes :
              </Label>
              <Col xs="auto">
                <Input
                  type="textarea"
                  name="select"
                  id="exampleSelect"
                  bsSize="sm"
                />
              </Col>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default SimilarPlacesSearch;
