import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/Home.css';
import { Card, CardBody, CardHeader } from 'reactstrap';

import DisplayComponent from './DisplayComponent';
import LeftSideBar from './LeftSideBar';
import YearSelector from './YearSelector';
import AttributeDeselector from './AttributeDeselector';
import Filters from './AttributeRange';
import Tabs from './Explore/Tabs';
import TimeSeriesGrid from './Explore/TimeSeriesGrid';

const homeStyle = {
  paddingTop: 70
};

class Home extends Component {
  render() {
    return (
      <Container fluid style={homeStyle}>
        <Row>
          <LeftSideBar />

          <div className="col-12 col-md-10 align-items-center">
            <Card>
              <div className={'attribute-selector-padding'}>
                <AttributeDeselector />
              </div>
              <Tabs>
                <div label="Table View">
                  <DisplayComponent
                    level={this.props.match.params.level}
                    id={this.props.match.params.id}
                  />
                </div>

                <div label="Time Series View">
                  <TimeSeriesGrid id={this.props.match.params.id} />
                </div>
              </Tabs>
            </Card>

            <Card>
              <CardHeader>
                <div>
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

export default Home;
