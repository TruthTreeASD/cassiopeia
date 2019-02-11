import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import '../styles/Home.css';
import _ from 'lodash';

import DisplayComponent from './DisplayComponent';
import LeftSideBar from './LeftSideBar';
import YearSelector from './YearSelector';
import Filters from './AttributeRange';
import axios from 'axios/index';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: null,
      data: [['Name', 'Population']]
    };
  }

  componentDidMount() {
    let currentLevel = this.props.match.params.level;
    let id = this.props.match.params.id;
    let minPopulation = 0;
    let maxPopulation = 0;
    let data = this.state.data;

    // Calculate min and max population
    axios
      .get('/api/' + currentLevel + '/' + id)
      .then(response => {
        let population = parseFloat(response.data.population.replace(/,/g, ''));
        maxPopulation = Math.floor(population * 1.5);
        minPopulation = Math.floor(population * 0.5);
        return axios
          .get(
            '/api/states?populationRange=' + minPopulation + ',' + maxPopulation
          )
          .then(response => {
            _.map(response.data, obj => {
              data.push([obj.name, obj.population]);
            });
            this.setState({ data: data });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
    // axios
    //     .get('/api/attributes?value='+allstatesids+'&attributes='+selectedAttributesString+'&yearList='+selectedYearString)
    //     .then(response => {
    //         //data contains the variables
    //         console.log(response.data);
    //         this.setState({
    //             sidebarData: response.data,
    //             isLoaded: true
    //         });
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
  }

  render() {
    return (
      <Row className="flex-grow-1 flex-shrink-1">
        <LeftSideBar />
        <div className="col-12 col-md-10 align-items-center">
          <DisplayComponent data={this.state.data} />
          <Row className="align-items-center">
            <Col sm={{ size: 6, order: 1, offset: 1 }}>
              <Filters />
            </Col>
            <Col sm={{ size: 4, order: 2, offset: 0 }}>
              <YearSelector />
            </Col>
          </Row>
        </div>
      </Row>
    );
  }
}
const mapState = state => ({
  dimension: state.FilterByReducer.dimension
});

export default connect(mapState)(Home);
