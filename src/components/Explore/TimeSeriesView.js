import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import axios from 'axios/index';
import { connect } from 'react-redux';
import _ from 'lodash';

import TimeSeriesChart from './TimeSeriesChart';
import { TRUTHTREE_URI } from '../../constants';

class TimeSeriesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locations: [],
      data: [],
      locationData: [],
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
        'slategray',
        'lime',
        'indianred',
        'dimgrey'
      ],
      populationRange: [-25, 25]
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedAttributes: nextProps.selectedAttributes
    });
    const len = this.props.selectedAttributes.length;
    if (len !== 0) {
      this.fetchLocations();
    }
  }

  fetchLocations() {
    let minPopulation = 0;
    let maxPopulation = 0;
    let year = this.props.yearSelected ? this.props.yearSelected : 2016;
    let locationIds = [];
    let data = {};
    let population = 0;
    // Calculate min and max population
    axios
      .get(
        `${TRUTHTREE_URI}/api/population?locationId=` +
          this.props.id +
          '&year=' +
          year
      )
      .then(response => {
        population = response.data.population;
        this.setState({ currentPopulation: population });
        maxPopulation = Math.floor(population + 0.5 * population);
        minPopulation = Math.floor(population - 0.5 * population);
        return axios
          .get(
            `${TRUTHTREE_URI}/api/${this.props.level}?populationRange=` +
              minPopulation +
              ',' +
              maxPopulation
          )
          .then(response => {
            console.log(response.data);
            _.map(response.data, obj => {
              data[obj.id] = { name: obj.name, '1': obj.population };
            });
            this.setState({ locationData: data });
            let currentRows = _.pickBy(data, e => {
              return (
                e['1'] <=
                  population +
                    (this.props.populationRange[1] / 100) * population &&
                e['1'] >=
                  population +
                    (this.props.populationRange[0] / 100) * population
              );
            });
            this.setState({
              locationIds: _.keys(currentRows)
            });
            this.setState({ locationData: data });
            this.props.updateLocation(data, _.keys(currentRows));
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
      this.props.selectedAttributes[this.props.index][0] +
      '&normalizationType=' +
      this.props.selectedNormalization;
    axios
      .get(url)
      .then(response => {
        console.log(response);
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
      console.log(this.state.locationData);
      console.log(dataForEachLocation.location_id);
      console.log(response.location_id);
      let lData = this.state.locationData[dataForEachLocation.location_id];
      let locationName = lData['name'];
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
            if (this.props.selectedNormalization === 'GROSS') {
              val[attrValue.year - 1967][locationName] = attrValue.value;
            } else if (this.props.selectedNormalization === 'PER_CAPITA') {
              val[attrValue.year - 1967][locationName] = attrValue.per_capita;
            } else if (this.props.selectedNormalization === 'BY_REVENUE') {
              val[attrValue.year - 1967][locationName] = attrValue.by_revenue;
            }
          }
          map[attributesForEachLocation.attribute_id] = val;
          return null;
        });
        if (
          this.props.userSelectedLocations.includes(
            dataForEachLocation.location_id
          )
        ) {
          location['id'] = dataForEachLocation.location_id;
          // let select = this.state.lineColors[Math.floor(Math.random() * 11)];
          let select = this.state.lineColors[locations.length - 1];
          location['color'] = select;
          location['name'] = locationName;
          locations.push(location);
        }
        return null;
      });
      return null;
    });
    data.push(map);
    this.setState({ data: data, locations: locations, loading: false });
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

    const { loading } = this.state;

    if (len === 0) {
      return <div>Select an attribute</div>;
    } else {
      if (loading) {
        return (
          <div className="d-flex justify-content-center">
            <Spinner
              className="align-self-center"
              color="secondary"
              size="sm"
            />
          </div>
        );
      } else {
        return this.state.data.map((attrData, i) => {
          return (
            <TimeSeriesChart
              data={
                attrData[this.props.selectedAttributes[this.props.index][i]]
              }
              attributeName={this.props.selectedAttributes[this.props.index][1]}
              collectionName={
                this.props.selectedAttributes[this.props.index][2]
              }
              locations={this.state.locations}
              condition={this.props.condition}
            />
          );
        });
      }
    }
  }
}

const mapState = state => ({
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes,
  year: state.YearSelectorReducer.yearSelected,
  populationRange: state.AttributeRangeReducer.populationRange,
  selectedNormalization: state.NormalizationReducer.selectedNormalizationName
});
export default connect(mapState)(TimeSeriesView);
