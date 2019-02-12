import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import '../styles/Home.css';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardHeader
} from 'reactstrap';

import DisplayComponent from './DisplayComponent';
import LeftSideBar from './LeftSideBar';
import YearSelector from './YearSelector';
import Filters from './AttributeRange';

class Home extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <LeftSideBar />

          <div className="col-12 col-md-10 align-items-center">
            <Card>
              <DisplayComponent
                level={this.props.match.params.level}
                id={this.props.match.params.id}
              />
            </Card>

            <Card>
              <CardHeader>
                <div>
                  {' '}
                  Selected Location: <b>{this.props.match.params.name}</b>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="border-right">
                    <Filters
                      level={this.props.match.params.level}
                      location={this.props.match.params.name}
                      locationId={this.props.match.params.id}
                    />
                  </Col>
                  <Col>
                    <YearSelector />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    );
  }
}
const mapState = state => ({
  dimension: state.FilterByReducer.dimension
});

export default connect(mapState)(Home);
