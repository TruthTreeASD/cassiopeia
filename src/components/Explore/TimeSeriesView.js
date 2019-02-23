import React, { Component } from 'react';
import axios from 'axios/index';
import { connect } from 'react-redux';

import TimeSeriesChart from './TimeSeriesChart';

import { TRUTHTREE_URI } from '../../constants';

class TimeSeriesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { year: '1967', location1: 400, location2: 1200, location0: 200 },
        { year: '1969', location1: 200, location2: 2400, location0: 100 },
        { year: '1971', location1: 700, location2: 2000, location0: 50 },
        { year: '1973', location1: 300, location2: 3000, location0: 25 },
        { year: '1975', location1: 300, location2: 3000, location0: 25 }
      ],

      locations: [
        { id: 'location0', name: 'location0', color: 'red' },
        { id: 'location1', name: 'location1', color: 'blue' },
        { id: 'location2', name: 'location2', color: 'purple' }
      ]
    };
  }

  componentDidMount() {
    let minPopulation = 0;
    let maxPopulation = 0;
    let data = [['Name', 'Population']];
    let locationIds = [];
    let year = this.props.yearSelected ? this.props.yearSelected : 2016;

    axios
      .get('${TRUTHTREE_URI}/api/population?locationId=10000000&year=2015')
      .then(function(response) {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <TimeSeriesChart
        data={this.state.data}
        attributeName="Population"
        locations={this.state.locations}
      />
    );
  }
}
const mapState = state => ({
  year: state.YearSelectorReducer.yearSelected
});
export default connect(mapState)(TimeSeriesView);
