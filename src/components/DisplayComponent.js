import React, { Component } from 'react';
import classNames from 'classnames';
import { defaultCellRangeRenderer, MultiGrid } from 'react-virtualized';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';

import 'react-virtualized/styles.css';
import '../styles/DisplayComponent.css';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.cellRenderer = this.cellRenderer.bind(this);
  }

  componentWillReceiveProps() {
    // Get the current level by parsing the url
    let currentLevel = window.location.pathname.split('/')[2];
    let id = window.location.pathname.split('/')[4];
    let minPopulation = 0;
    let maxPopulation = 0;
    let data = [['Name', 'Population']];

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

    this.setState({ currentLevel: currentLevel });
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

  // Grid data as an array of arrays

  cellRenderer({ columnIndex, key, rowIndex, style }) {
    console.log(this);
    // let list = this.state.data;
    // return (
    //   <div key={key} style={style}>
    //     {list[rowIndex][columnIndex]}
    //   </div>
    // );
  }

  customizedGrid(props) {
    return (
      <MultiGrid
        cellRenderer={this.cellRenderer}
        columnCount={8}
        columnWidth={150}
        fixedColumnCount={2}
        fixedRowCount={1}
        height={500}
        rowCount={4}
        rowHeight={30}
        width={1100}
      />
    );
  }

  render() {
    return (
      <div className="col-12 col-md-10 align-items-center">
        {this.customizedGrid([1, 2, 3])}
      </div>
    );
  }
}

const mapState = state => ({
  year: state.YearSelectorReducer.yearSelected,
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes
});

export default connect(mapState)(DisplayComponent);
