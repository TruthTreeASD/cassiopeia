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
      // data: [
      //   { year: '1967', location1: 400, location2: 1200, location0: 200 },
      //   { year: '1969', location1: 200, location2: 2400, location0: 100 },
      //   { year: '1971', location1: 700, location2: 2000, location0: 50 },
      //   { year: '1973', location1: 300, location2: 3000, location0: 25 },
      //   { year: '1975', location1: 300, location2: 3000, location0: 25 }
      // ],

      // locations: [
      //   { id: 'location0', name: 'location0', color: 'purple' },
      //   { id: 'location1', name: 'location1', color: 'blue' },
      //   { id: 'location2', name: 'location2', color: 'purple' }
      // ],
      locations: [],
      data: [],
      currentLevel: null,
      info: [],
      temp: [],
      dataReal: [],
      locationIds: []
    };
    this.populationRangeCall = this.populationRangeCall.bind(this);
    this.formatResponse = this.formatResponse.bind(this);
    this.initializeYearMap = this.initializeYearMap.bind(this);
  }

  componentDidMount() {
    this.populationRangeCall();
    console.log('after call');
  }

  componentWillReceiveProps() {
    this.populationRangeCall();
    console.log('after call');
  }

  createData() {}

  populationRangeCall() {
    let temp = [];
    let info = [];
    let locationIds = [];
    let url = `${TRUTHTREE_URI}/api/attributes?locationIds=` + this.props.id;
    console.log(this.props.selectedAttributes);

    axios
      .get(
        'http://localhost:8080/api/attributes?locationIds=' +
          this.props.id +
          '&attributeIds=' +
          this.props.selectedAttributes[0][0]
      )
      .then(response => {
        console.log(response);
        this.formatResponse(response);

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

  formatResponse(response) {
    console.log(response);
    let data = [];
    let locations = [];
    let map = {};
    response.data.map(dataForEachLocation => {
      let location = {};
      console.log(dataForEachLocation);
      dataForEachLocation.attributes.map(attributesForEachLocation => {
        console.log(attributesForEachLocation);
        attributesForEachLocation.data.map(attrValue => {
          let val = map[attributesForEachLocation.attribute_id];
          if (val === undefined) {
            val = this.initializeYearMap();
          }
          let da = val[attrValue.year - 1967];
          if (
            da[dataForEachLocation.location_id] === 0 ||
            da[dataForEachLocation.location_id] === undefined
          ) {
            val[attrValue.year - 1967][dataForEachLocation.location_id] =
              attrValue.value;
          }
          map[attributesForEachLocation.attribute_id] = val;
        });
        location['id'] = dataForEachLocation.location_id;
        location['color'] = 'purple';
        location['name'] = 'location1';
        locations.push(location);
      });
    });
    console.log(map);
    data.push(map);

    // response.map(locationAttr => {
    //
    // })
    // this.setState({ data: response.data[0].attributes[0].data });
    this.setState({ data: data, locations: locations });
  }

  initializeYearMap() {
    let yearArr = [];
    for (let i = 1967; i < 2017; i++) {
      let yearEntry = { year: i, 10000000: 0 };
      yearArr.push(yearEntry);
    }
    return yearArr;
  }

  render() {
    return this.state.data.map((attrData, i) => {
      return (
        <TimeSeriesChart
          data={attrData[this.props.selectedAttributes[i][i]]}
          attributeName={this.props.selectedAttributes[i][i]}
          locations={this.state.locations}
        />
      );
    });
  }
}
const mapState = state => ({
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes,
  year: state.YearSelectorReducer.yearSelected,
  populationRange: state.AttributeRangeReducer.populationRange
});
export default connect(mapState)(TimeSeriesView);
