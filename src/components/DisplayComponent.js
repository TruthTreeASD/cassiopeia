import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';
import '../styles/DisplayComponent.css';
import { TRUTHTREE_URI } from '../constants';
import { Table } from 'reactstrap';

import Normalization from './Explore/Normalization';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: null,
      data: {},
      locationIds: [],
      selectedAttributes: [],
      year: 2016,
      selectedNormalizationName: 'GROSS'
    };
    this.getAttributeType = this.getAttributeType.bind(this);
    this.populationRangeCall = this.populationRangeCall.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedAttributes: nextProps.selectedAttributes,
      year: nextProps.year,
      selectedNormalizationName: nextProps.selectedNormalizationName,
      normalizationKeys: nextProps.normalizationKeys
    });
    let attributes = _.flatMap(nextProps.selectedAttributes, elem => {
      return elem[0];
    });
    if (attributes.length > 0) {
      axios
        .get(
          '/api/attributes?locationIds=' +
            this.state.locationIds +
            '&attributeIds=' +
            attributes +
            '&normalizationType=' +
            nextProps.selectedNormalizationName +
            '&yearList=' +
            nextProps.year
        )
        .then(response => {
          let data = this.state.data;
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
          this.setState({ data: data });
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.populationRangeCall();
  }

  getAttributeType(type) {
    return _.flatMap(this.state.selectedAttributes, elem => {
      return type === 'ids' ? elem[0] : elem[1];
    });
  }

  componentDidMount() {
    this.setState({
      data: {},
      selectedAttribtes: this.props.selectedAttributes,
      year: this.props.yearSelected,
      selectedNormalizationName: this.props.selectedNormalizationName
    });
    this.populationRangeCall();
  }

  populationRangeCall() {
    let minPopulation = 0;
    let maxPopulation = 0;
    let data = {};
    let locationIds = [];
    // Calculate min and max population
    axios
      .get(
        `${TRUTHTREE_URI}/api/population?locationId=` +
          this.props.id +
          '&year=' +
          this.state.year
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
              data[obj.id] = { name: obj.name, '1': obj.population };
              locationIds.push(obj.id);
            });
            this.setState({ data: data });
            this.setState({ locationIds: locationIds });
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
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Population</th>
              {this.state.selectedAttributes.map((column, index) => {
                return <th key={index}>{column[1]}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {_.values(this.state.data).map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row['name']}</td>
                  <td>{row['1'].toLocaleString()}</td>
                  {this.state.selectedAttributes.map((column, i) => {
                    let url =
                      'https://www.google.com/search?q=' +
                      row['name'] +
                      '+' +
                      this.state.selectedAttributes[i][1];
                    return (
                      <td key={i}>
                        <a href={url} target="_blank">
                          {row[column[0]]
                            ? row[column[0]].toLocaleString()
                            : ''}
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
