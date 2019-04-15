import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';
import '../styles/DisplayComponent.css';
import { TRUTHTREE_URI } from '../constants';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

import Normalization from './Explore/Normalization';
import { confirmAlert } from 'react-confirm-alert';
import Pagination from 'react-js-pagination';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPopulation: 0,
      currentLevel: null,
      data: {},
      curPage: 1,
      totalPageNumber: 0,
      pageSize: 50,
      totalItemsCount: 0,
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
    this.colFormatter = this.colFormatter.bind(this);
    //this.nextPageClick = this.nextPageClick.bind(this);
    //this.prevPageClick = this.prevPageClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedAttributes: nextProps.selectedAttributes,
      year: nextProps.year,
      selectedNormalizationName: nextProps.selectedNormalizationName,
      populationRange: nextProps.populationRange,
      normalizationKeys: nextProps.normalizationKeys
    });
    let currentRows = _.pickBy(this.state.data, e => {
      return (
        e['1'] <=
          this.state.currentPopulation +
            (nextProps.populationRange[1] / 100) *
              this.state.currentPopulation &&
        e['1'] >=
          this.state.currentPopulation +
            (nextProps.populationRange[0] / 100) * this.state.currentPopulation
      );
    });
    this.setState({
      selectedData: currentRows,
      locationIds: _.keys(currentRows)
    });
    // this.setState({ locationIds: _.keys(currentRows) });
    let attributes = _.flatMap(nextProps.selectedAttributes, elem => {
      return elem[0];
    });
    if (attributes.length > 0) {
      this.attributeCall(_.keys(currentRows), attributes, nextProps);
    }
  }

  attributeCall(locationIds, attributes, nextProps) {
    let year = nextProps.year ? nextProps.year : 2016;
    axios
      .get(
        '/api/attributes?locationIds=' +
          locationIds +
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
      selectedNormalizationName: this.props.selectedNormalizationName,
      populationRange: this.props.populationRange
    });
    this.populationRangeCall();
  }

  getFormattedName(cell) {
    if (cell.toLowerCase() === this.props.location.replace(/-/g, ' ')) {
      return <b>{_.capitalize(cell)}</b>;
    } else {
      return _.capitalize(cell);
    }
  }

  handleChangeSearch = event => {
    let search = event.target.value.toLowerCase();
    search = search.replace('\\', '');
    search = search.replace('*', '');
    this.setState({
      searchBoxText: search
    });
  };

  handlePageChange(pageNumber) {
    this.setState({ curPage: pageNumber });
    this.populationRangeCall();
    console.log(this.state.curPage);
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
        maxPopulation = Math.floor(population + 0.5 * population);
        minPopulation = Math.floor(population - 0.5 * population);
        //Putting pagation here.
        return axios
          .get(
            `${TRUTHTREE_URI}/api/${this.props.level}?populationRange=` +
              minPopulation +
              ',' +
              maxPopulation +
              '&pageNumber=' +
              this.state.curPage //+pageSize+'pageSize='+pageSize
          )
          .then(response => {
            console.log(response);
            _.map(response.data.items, obj => {
              data[obj.id] = { name: obj.name, '1': obj.population };
            });
            this.setState({
              data: data,
              totalItemsCount: response.data.totalItemCount,
              totalPageNumber: response.data.totalPageCount
            });
            let currentRows = _.pickBy(this.state.data, e => {
              return (
                e['1'] <=
                  population +
                    (this.state.populationRange[1] / 100) * population &&
                e['1'] >=
                  population +
                    (this.state.populationRange[0] / 100) * population
              );
            });
            this.setState({
              selectedData: currentRows,
              locationIds: _.keys(currentRows)
            });
            if (this.props.selectedAttributes) {
              let attributes = _.flatMap(
                this.props.selectedAttributes,
                elem => {
                  return elem[0];
                }
              );
              this.attributeCall(_.keys(currentRows), attributes, this.state);
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

  colFormatter(cell, row) {
    let link =
      'https://www.google.com/search?q=' +
      row[0] +
      '+' +
      this.state.selectedAttributes[0][2] +
      ' ' +
      this.state.selectedAttributes[0][1];
    return (
      <a
        className="table-link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#023e58' }}
      >
        {cell.toLocaleString()}
      </a>
    );
  }

  render() {
    var columns = [
      {
        dataField: 'id',
        text: 'Id',
        hidden: true
      },
      {
        dataField: '0',
        text: 'Name',
        formatter: this.getFormattedName
      },
      {
        dataField: '1',
        text: 'Population',
        sort: true
      }
    ];
    this.state.selectedAttributes.map((column, index) => {
      columns.push({
        dataField: (index + 2).toString(),
        text: column[1],
        sort: true,
        formatter: this.colFormatter
      });
    });
    var data = [];
    _.values(this.state.selectedData).map((row, i) => {
      var currentRow = {};
      currentRow['id'] = this.state.locationIds[i];
      currentRow['0'] = _.capitalize(row['name']);
      currentRow['1'] = row['1'].toLocaleString();
      this.state.selectedAttributes.map((column, i) => {
        var currentValue = row[column[0]] ? row[column[0]] : '-';
        currentRow[(i + 2).toString()] = currentValue;
      });
      data.push(currentRow);
    });
    const { ExportCSVButton } = CSVExport;
    return (
      <div id="mainDisplay">
        <Normalization />
        <ToolkitProvider keyField="id" data={data} columns={columns} exportCSV>
          {props => (
            <div className="">
              <ExportCSVButton
                className="btn btn-secondary"
                {...props.csvProps}
              >
                Export as csv
              </ExportCSVButton>
              <Pagination
                className="justify-content-center"
                activePage={this.state.curPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={this.state.totalItemsCount}
                pageRangeDisplayed={
                  this.state.totalPageNumber > 4
                    ? 5
                    : this.state.totalPageNumber
                }
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />

              <hr />
              <BootstrapTable hover striped {...props.baseProps} />
            </div>
          )}
        </ToolkitProvider>
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
