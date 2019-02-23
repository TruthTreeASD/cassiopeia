import React, { Component } from 'react';
import { Grid } from 'react-virtualized';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';
import '../styles/DisplayComponent.css';
import { TRUTHTREE_URI } from '../constants';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: null,
      data: [['Name', 'Population']],
      locationIds: []
    };
    this.cellRenderer = this.cellRenderer.bind(this);
    this.getAttributeType = this.getAttributeType.bind(this);
    this.populationRangeCall = this.populationRangeCall.bind(this);
  }

  cellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style}>
        {this.state.data[rowIndex][columnIndex]}
      </div>
    );
  }

  getAttributeType(type) {
    console.log(this.props.selectedAttributes);
    return _.flatMap(this.props.selectedAttributes, elem => {
      return type === 'ids' ? elem[0] : elem[1];
    });
  }

  componentDidMount() {
    this.populationRangeCall();
  }

  populationRangeCall() {
    let minPopulation = 0;
    let maxPopulation = 0;
    let data = [['Name', 'Population']];
    let locationIds = [];
    let year = this.props.yearSelected ? this.props.yearSelected : 2016;
    // Calculate min and max population
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
              data.push([obj.name, obj.population]);
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
    console.log('----------');
    console.log(this.props);
    console.log('----------');
    let attributes = this.getAttributeType('ids');
    if (attributes.length > 0) {
      let temp = ['Name', 'Population'];
      this.state.data[0] = temp.concat(this.getAttributeType('name'));
      axios
        .get(
          '/api/attributes?locationIds=' +
            this.state.locationIds +
            '&attributeIds=' +
            attributes +
            '&yearList=' +
            this.props.year
        )
        .then(response => {
          //data contains the variables
          console.log(response.data);
          _.map(response.data, row => {
            console.log('+++++++++');
            console.log(
              this.state.data[this.state.locationIds.indexOf(row.location_id)]
            );
            console.log(
              _.map(row.attributes, elem => {
                return elem.data;
              })
            );
            console.log('++++++++++');
            this.state.data[
              this.state.locationIds.indexOf(row.location_id)
            ].push(
              row.attributes[0].data[0].value
              // _.map(row.attributes, elem => {
              //     return elem.data[0].value;
              // })
            );
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    return (
      <div id="mainDisplay">
        <Grid
          cellRenderer={this.cellRenderer}
          columnCount={this.state.data[0].length}
          columnWidth={150}
          height={500}
          rowCount={this.state.data.length}
          rowHeight={35}
          width={1100}
        />
      </div>
    );
  }
}

const mapState = state => ({
  year: state.YearSelectorReducer.yearSelected,
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes,
  populationRange: state.AttributeRangeReducer.populationRange
});

export default connect(mapState)(DisplayComponent);
