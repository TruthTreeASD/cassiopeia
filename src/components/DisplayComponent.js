import React, { Component } from 'react';
import classNames from 'classnames';
import { Grid } from 'react-virtualized';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';

import styles from 'react-virtualized/styles.css';
import '../styles/DisplayComponent.css';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: null,
      data: [['Name', 'Population']]
    };
    this.cellRenderer = this.cellRenderer.bind(this);
  }

  cellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style}>
        {this.state.data[rowIndex][columnIndex]}
      </div>
    );
  }

  componentDidMount() {
    let minPopulation = 0;
    let maxPopulation = 0;
    let data = [['Name', 'Population']];

    // Calculate min and max population
    axios
      .get('/api/' + this.props.level + '/' + this.props.id)
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
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes
});

export default connect(mapState)(DisplayComponent);
