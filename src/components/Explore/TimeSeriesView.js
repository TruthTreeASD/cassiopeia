import React, { Component } from 'react';
import axios from 'axios/index';
import { connect } from 'react-redux';
import _ from 'lodash';

import TimeSeriesChart from './TimeSeriesChart';
import { TRUTHTREE_URI } from '../../constants';

class TimeSeriesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: [
        { year: '1967', location1: 400, location2: 1200, location0: 200 },
        { year: '1969', location1: 200, location2: 2400, location0: 100 },
        { year: '1971', location1: 700, location2: 2000, location0: 50 },
        { year: '1973', location1: 300, location2: 3000, location0: 25 },
        { year: '1975', location1: 300, location2: 3000, location0: 25 }
      ],

      locations: [
        { id: 'location0', name: 'value', color: 'purple' }
        //{ id: 'location1', name: 'location1', color: 'blue' },
        //{ id: 'location2', name: 'location2', color: 'purple' }
      ],
      currentLevel: null,
      info: [],
      data: [],
      dataReal: [],
      locationIds: []
    };
    this.populationRangeCall = this.populationRangeCall.bind(this);
    this.createData = this.createData.bind(this);
  }

  componentDidMount() {
    this.populationRangeCall();
    console.log('after call');
  }

  createData() {}

  populationRangeCall() {
    let temp = [];
    let info = [];
    let locationIds = [];
    let url = `${TRUTHTREE_URI}/api/attributes?locationIds=` + this.props.id;
    console.log(url);

    axios
      .get(
        'https://truthtree.herokuapp.com/api/attributes?locationIds=' +
          this.props.id +
          '&attributeIds=1'
      )
      .then(response => {
        this.setState({ data: response.data[0].attributes[0].data });

        // _.map(this.state.temp, obj => {
        //   info.push([ obj.year,obj.value]);
        // });
        // locationIds.push(this.props.id);
        // this.setState({ info: info });
        // this.setState({ locationIds: locationIds });
        // console.log(this.state.temp);
        // this.state.info.reverse();
        // console.log(this.state.info);
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
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes,
  year: state.YearSelectorReducer.yearSelected,
  populationRange: state.AttributeRangeReducer.populationRange
});
export default connect(mapState)(TimeSeriesView);
