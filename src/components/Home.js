import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/Home.css';
import { Card, CardBody, CardHeader } from 'reactstrap';

import DisplayComponent from './DisplayComponent';
import LeftSideBar from './LeftSideBar';
import YearSelector from './YearSelector';
import AttributeDeselector from './AttributeDeselector';
import AttributeRange from './AttributeRange';
import Tabs from './Explore/Tabs';
import TimeSeriesGrid from './Explore/TimeSeriesGrid';
import StoryCreationComponent from './StoryCreationComponent';
import { connect } from 'react-redux';

const homeStyle = {
  paddingTop: 75
};

class Home extends Component {
  componentDidMount() {
    // reset year
    this.props.dispatch({
      type: 'CHANGE_YEAR',
      yearSelected: 2016
    });
    // reset normalization
    this.props.dispatch({
      type: 'CHANGE_NORMALIZATION',
      selectedNormalizationName: 'GROSS',
      selectedNormalizationDisplayName: 'Gross'
    });
    // reset selected attributes
    this.props.dispatch({
      type: 'CHANGE_ATTRIBUTE',
      value: []
    });
    // reset range
    this.props.dispatch({
      type: 'RANGE_SELECTION',
      populationRange: [-25, 25]
    });
  }

  render() {
    return (
      <Container fluid style={homeStyle} className="home">
        <Row>
          <LeftSideBar />

          <div className="col-12 col-md-10 align-items-center padding">
            <Card className="selected-attributes padding">
              <AttributeDeselector />
            </Card>

            <Card className="right-panel">
              <Tabs>
                <div label="Table View">
                  <DisplayComponent
                    level={this.props.match.params.level}
                    id={this.props.match.params.id}
                    location={this.props.match.params.name}
                  />
                </div>

                <div label="Time Series View">
                  <TimeSeriesGrid
                    id={this.props.match.params.id}
                    level={this.props.match.params.level}
                  />
                </div>

                <div label="Create a Story">
                  <StoryCreationComponent />
                </div>
              </Tabs>
            </Card>

            <Card className="bottom-panel">
              <CardHeader className="bottom-panel-header">
                <div>
                  Selected Location: <b>{this.props.match.params.name}</b>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col className="border-right">
                    <AttributeRange
                      level={this.props.match.params.level}
                      location={this.props.match.params.name}
                      locationId={this.props.match.params.id}
                    />
                  </Col>
                  <Col sm="2" xs="2">
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

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapDispatchToProps)(Home);
