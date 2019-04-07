import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/Home.css';
import {
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  Button
} from 'reactstrap';

import DisplayComponent from './DisplayComponent';
import LeftSideBar from './LeftSideBar';
import YearSelector from './YearSelector';
import AttributeDeselector from './AttributeDeselector';
import AttributeRange from './AttributeRange';
import Tabs from './Explore/Tabs';
import TimeSeriesGrid from './Explore/TimeSeriesGrid';
import StoryCreationComponent from './StoryCreationComponent';
import { TRUTHTREE_URI } from '../constants';
import axios from 'axios';

import { connect } from 'react-redux';
import { Popper } from 'react-popper';

const homeStyle = {
  paddingTop: 75
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openStory: false,
      locationPopulation: null
    };

    this.modalToggle = this.modalToggle.bind(this);
  }

  modalToggle() {
    this.setState({
      openStory: !this.state.openStory
    });
  }
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

    //console.log(this.props)
    //let year = this.props.yearSelected ? this.props.yearSelected : 2016;

    axios
      .get(
        `${TRUTHTREE_URI}/api/population?locationId=` +
          this.props.match.params.id +
          '&year=' +
          2016
      )
      .then(res => {
        this.setState({ locationPopulation: res.data.population });
      })
      .catch(err => console.log(err + 'ugh somethong'));
  }

  render() {
    return (
      <Container fluid style={homeStyle} className="home">
        <Row>
          <LeftSideBar />
          <div className="col-12 col-md-10 align-items-center padding">
            <div>
              <Button
                className="create-story"
                color="primary"
                onClick={this.modalToggle}
              >
                Create Story
              </Button>{' '}
              <Modal isOpen={this.state.openStory} toggle={this.modalToggle}>
                <ModalBody className="backgroundWhite">
                  <StoryCreationComponent />
                </ModalBody>
                <Button color="secondary" onClick={this.modalToggle}>
                  Close
                </Button>
              </Modal>
            </div>
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
              </Tabs>
            </Card>

            <Card className="bottom-panel">
              <CardHeader className="bottom-panel-header">
                <div>
                  Selected Location: <b>{this.props.match.params.name}</b>
                  &nbsp;&nbsp;&nbsp;&nbsp; Population :
                  <b>{this.state.locationPopulation}</b>
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
