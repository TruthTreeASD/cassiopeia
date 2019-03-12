import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';
import '../styles/DisplayComponent.css';
import { TRUTHTREE_URI } from '../constants';
import { Table } from 'reactstrap';

import Normalization from './Explore/Normalization';
import { confirmAlert } from 'react-confirm-alert';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPopulation: 0,
      currentLevel: null,
      data: {},
      selectedData: {},
      locationIds: [],
      selectedAttributes: [],
      year: 2016,
      selectedNormalizationName: 'GROSS',
      populationRange: [-25, 25]
    };
    this.populationRangeCall = this.populationRangeCall.bind(this);
    this.getFormattedName = this.getFormattedName.bind(this);
    this.attributeCall = this.attributeCall.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedAttributes: nextProps.selectedAttributes,
      year: nextProps.year,
      selectedNormalizationName: nextProps.selectedNormalizationName,
      populationRange: nextProps.populationRange,
      normalizationKeys: nextProps.normalizationKeys
    });
    if (this.state.populationRange !== nextProps.populationRange) {
      let currentRows = _.pickBy(this.state.data, e => {
        return (
          e['1'] <=
            this.state.currentPopulation +
              (nextProps.populationRange[1] / 100) *
                this.state.currentPopulation &&
          e['1'] >=
            this.state.currentPopulation +
              (nextProps.populationRange[0] / 100) *
                this.state.currentPopulation
        );
      });
      this.setState({ selectedData: currentRows });
      this.setState({ locationIds: _.keys(currentRows) });
    }
    let attributes = _.flatMap(nextProps.selectedAttributes, elem => {
      return elem[0];
    });
    if (attributes.length > 0) {
      this.attributeCall(attributes, nextProps);
    }
  }

  attributeCall(attributes, nextProps) {
    let year = nextProps.year ? nextProps.year : 2016;
    axios
      .get(
        '/api/attributes?locationIds=' +
          this.state.locationIds +
          '&attributeIds=' +
          attributes +
          '&normalizationType=' +
          nextProps.selectedNormalizationName +
          '&yearList=' +
          year
      )
      .then(response => {
        let data = this.state.selectedData;
        _.map(response.data, row => {
          _.map(row.attributes, elem => {
            data[row.location_id][elem.attribute_id] =
              nextProps.selectedNormalizationName === 'PER_CAPITA'
                ? elem.data[0].per_capita
                : nextProps.selectedNormalizationName === 'BY_REVENUE'
                ? elem.data[0].by_revenue
                : elem.data[0].value;
          });
        });
        this.setState({ selectedData: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.setState({
      data: {},
      selectedAttributes: this.props.selectedAttributes,
      year: this.props.yearSelected,
      selectedNormalizationName: this.props.selectedNormalizationName
    });
    if (!this.state.currentPopulation) {
      this.populationRangeCall();
    }
  }

  getFormattedName(rowName) {
    if (rowName.toLowerCase() === this.props.location.replace(/-/g, ' ')) {
      return <b>{_.capitalize(rowName)}</b>;
    } else {
      return _.capitalize(rowName);
    }
  }

  populationRangeCall() {
    let minPopulation = 0;
    let maxPopulation = 0;
    let data = {};
    let population = 0;
    let year = this.state.year ? this.state.year : 2016;
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
        if (!population) {
          confirmAlert({
            title: 'Oops!',
            message:
              'The location you have selected does not seem to have data. Please go back and chose another location.',
            buttons: [
              {
                label: 'OK'
              }
            ]
          });
        }
        this.setState({ currentPopulation: population });
        maxPopulation = Math.floor(population + (50 / 100) * population);
        minPopulation = Math.floor(population + (-50 / 100) * population);
        return axios
          .get(
            `${TRUTHTREE_URI}/api/${this.props.level}?populationRange=` +
              minPopulation +
              ',' +
              maxPopulation
          )
          .then(response => {
            _.map(response.data, obj => {
              data[obj.id] = { name: obj.name, '1': obj.population };
            });
            this.setState({ data: data });
            let currentRows = _.pickBy(this.state.data, e => {
              return (
                e['1'] <= population + 0.25 * population &&
                e['1'] >= population - 0.25 * population
              );
            });
            this.setState({ selectedData: currentRows });
            this.setState({
              locationIds: _.keys(currentRows)
            });
            if (this.props.selectedAttributes) {
              let attributes = _.flatMap(
                this.props.selectedAttributes,
                elem => {
                  return elem[0];
                }
              );
              this.attributeCall(attributes, this.state);
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div id="mainDisplay">
        <Normalization />
        <Table hover striped size="sm">
          <thead className="table-header">
            <tr>
              <th>Name</th>
              <th>Population</th>
              {this.state.selectedAttributes.map((column, index) => {
                return <th key={index}>{column[1]}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {_.values(this.state.selectedData).map((row, index) => {
              return (
                <tr key={index}>
                  <td>{this.getFormattedName(row['name'])}</td>
                  <td>{row['1'].toLocaleString()}</td>
                  {this.state.selectedAttributes.map((column, i) => {
                    let url =
                      'https://www.google.com/search?q=' +
                      row['name'] +
                      '+' +
                      this.state.selectedAttributes[i][1];
                    return (
                      <td key={i}>
                        <a
                          className="link-value"
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {row[column[0]]
                            ? row[column[0]].toLocaleString()
                            : '-'}
                        </a>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapState = state => ({
  year: state.YearSelectorReducer.yearSelected,
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes,
  populationRange: state.AttributeRangeReducer.populationRange,
  selectedNormalizationName:
    state.NormalizationReducer.selectedNormalizationName
});

export default connect(mapState)(DisplayComponent);
