import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';
import '../styles/DisplayComponent.css';
import { TRUTHTREE_URI } from '../constants';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
import { Table } from 'reactstrap';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: null,
      data: {},
      locationIds: [],
      dropdownOpen: false,
      selectedNormalization: 'No attribute',
      normalizationValues: []
    };
    this.getAttributeType = this.getAttributeType.bind(this);
    this.populationRangeCall = this.populationRangeCall.bind(this);
    this.normalizationValuesCall = this.normalizationValuesCall.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setSelectedNormalization = this.setSelectedNormalization.bind(this);
  }

  getAttributeType(type) {
    console.log(this.props.selectedAttributes);
    return _.flatMap(this.props.selectedAttributes, elem => {
      return type === 'ids' ? elem[0] : elem[1];
    });
  }

  componentDidMount() {
    this.setState(prevState => ({
      data: {}
    }));
    this.normalizationValuesCall();
    this.populationRangeCall();
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  setSelectedNormalization(value) {
    this.setState(prevState => ({
      selectedNormalization: value
    }));
  }

  normalizationValuesCall() {
    axios
      .get(`${TRUTHTREE_URI}/api/normalization_types`)
      .then(response => {
        console.log(response.data);
        this.setState({ normalizationValues: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  populationRangeCall() {
    let minPopulation = 0;
    let maxPopulation = 0;
    let data = {};
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
    let attributes = this.getAttributeType('ids');
    if (attributes.length > 0) {
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
          _.map(response.data, row => {
            _.map(row.attributes, elem => {
              this.state.data[row.location_id][elem.attribute_id] =
                elem.data[0].value;
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    return (
      <div id="mainDisplay">
        <div id="normalisation">
          Normalization attribute:
          <Dropdown
            id="dropdown"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle caret>
              {this.state.selectedNormalization}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => this.setSelectedNormalization('No attribute')}
              >
                No attribute
              </DropdownItem>
              <DropdownItem
                onClick={() => this.setSelectedNormalization('Gross')}
              >
                Gross
              </DropdownItem>
              <DropdownItem
                onClick={() => this.setSelectedNormalization('Per Capita')}
              >
                Per Capita
              </DropdownItem>
              <DropdownItem
                onClick={() => this.setSelectedNormalization('Per Revenue')}
              >
                Per Revenue
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Population</th>
              {this.props.selectedAttributes.map((column, index) => {
                return <th key={index}>{column[1]}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {_.values(this.state.data).map((row, index) => {
              return (
                <tr key={index}>
                  <td>{row['name']}</td>
                  <td>{row['1']}</td>
                  {this.props.selectedAttributes.map(column => {
                    return <td>{row[column[0]]}</td>;
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
  populationRange: state.AttributeRangeReducer.populationRange
});

export default connect(mapState)(DisplayComponent);
