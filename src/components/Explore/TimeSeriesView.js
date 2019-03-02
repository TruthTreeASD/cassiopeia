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
      locations: [],
      data: [],
      currentLevel: null,
      dataReal: [],
      locationIds: [],
      lineColors: [
        'red',
        'purple',
        'green',
        'blue',
        'deeppink',
        'orange',
        'navy',
        'olive',
        'lime',
        'indianred',
        'dimgrey'
      ]
    };
    this.fetchResponse = this.fetchResponse.bind(this);
    this.formatResponse = this.formatResponse.bind(this);
    this.initializeYearMap = this.initializeYearMap.bind(this);
    this.fetchLocations = this.fetchLocations.bind(this);
  }

  componentDidMount() {
    const len = this.props.selectedAttributes.length;
    if (len !== 0) {
      this.fetchLocations();
    }
  }

  componentWillReceiveProps() {
    const len = this.props.selectedAttributes.length;
    if (len !== 0) {
      this.fetchLocations();
    }
  }

  fetchLocations() {
    let minPopulation = 0;
    let maxPopulation = 0;
    let locationIds = [];
    let year = this.props.yearSelected ? this.props.yearSelected : 2016;

    axios
      .get(
        `${TRUTHTREE_URI}/api/population?locationId=` +
          this.props.id +
          '&year=' +
          year
      )
      .then(response => {
        let population = response.data.population;
        maxPopulation = Math.floor(
          population + (this.props.populationRange[1] / 100) * population
        );
        minPopulation = Math.floor(
          population + (this.props.populationRange[0] / 100) * population
        );
        return axios
          .get(
            `${TRUTHTREE_URI}/api/states?populationRange=` +
              minPopulation +
              ',' +
              maxPopulation
          )
          .then(response => {
            _.map(response.data, obj => {
              locationIds.push(obj.id);
            });
            this.setState({ locationIds: locationIds });
            // console.log('Location Ids are:', locationIds);
            // console.log(
            //   `${TRUTHTREE_URI}/api/population?locationId=` +
            //     this.state.locationIds +
            //     '&year=' +
            //     year
            // );
            this.fetchResponse();
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchResponse() {
    let url =
      `${TRUTHTREE_URI}/api/attributes?locationIds=` +
      this.state.locationIds +
      '&attributeIds=' +
      this.props.selectedAttributes[this.props.index][0];
    axios
      .get(url)
      .then(response => {
        this.formatResponse(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  formatResponse(response) {
    let data = [];
    let locations = [];
    let map = {};
    response.data.map(dataForEachLocation => {
      let location = {};
      dataForEachLocation.attributes.map(attributesForEachLocation => {
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
        let select = this.state.lineColors[Math.floor(Math.random() * 11)];
        location['color'] = select;
        location['name'] = dataForEachLocation.location_id;
        locations.push(location);
      });
    });
    data.push(map);
    this.setState({ data: data, locations: locations });
  }

  initializeYearMap() {
    let yearArr = [];
    for (let i = 1967; i < 2017; i++) {
      let yearEntry = { year: i };
      yearArr.push(yearEntry);
    }
    return yearArr;
  }

  render() {
    const len = this.props.selectedAttributes.length;

    if (len === 0) {
      return <div>Select an attribute</div>;
    } else {
      return this.state.data.map((attrData, i) => {
        return (
          <TimeSeriesChart
            data={attrData[this.props.selectedAttributes[this.props.index][i]]}
            attributeName={this.props.selectedAttributes[this.props.index][1]}
            locations={this.state.locations}
            condition={this.props.condition}
          />
        );
      });
    }
  }
}

const mapState = state => ({
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes,
  year: state.YearSelectorReducer.yearSelected,
  populationRange: state.AttributeRangeReducer.populationRange
});
export default connect(mapState)(TimeSeriesView);
