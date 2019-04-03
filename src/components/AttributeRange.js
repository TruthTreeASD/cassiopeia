import React, { Component } from 'react';
import Slider from 'rc-slider';
import { connect } from 'react-redux';
import axios from 'axios';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../styles/AttributeRange.css';
import { TRUTHTREE_URI } from '../constants';

const Range = Slider.Range;

const marks = {
  '-50': '-50%',
  '-40': '-40%',
  '-30': '-30%',
  '-20': '-20%',
  '-10': '-10%',
  '0': '0%',
  '10': '10%',
  '20': '+20%',
  '30': '+30%',
  '40': '+40%',
  '50': '+50%'
};

class AttributeRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationPopulation: null,
      value: [-5, 5],
      min: -50,
      max: 50
    };
  }

  componentDidMount() {
    let year = this.props.yearSelected ? this.props.yearSelected : 2016;
    let url =
      `${TRUTHTREE_URI}/api/population?locationId=` +
      this.props.locationId +
      '&year=' +
      year;
    let locPop = null;

    axios
      .get(url)
      .then(res => {
        locPop = res.data.population;
        this.setState({ locationPopulation: locPop });
      })
      .catch(err => console.log(err));
  }

  onSliderChange = value => {
    console.log();
    this.props.dispatch({
      type: 'RANGE_SELECTION',
      populationRange: value
    });
  };

  render() {
    const createSliders = this.props.attribute.attributeName.map(
      (currentAttribute, i) => (
        <div className="outer" key={i}>
          <p className="no-margin">
            Select range of {currentAttribute} for filtering other{' '}
            {this.props.level}:{' '}
            <b>
              {this.props.attribute.populationRange[0]}% to{' '}
              {this.props.attribute.populationRange[1]}%
            </b>
          </p>
          <br />

          <Range
            dots
            step={5}
            value={this.props.attribute.populationRange}
            min={this.state.min}
            max={this.state.max}
            marks={marks}
            onChange={this.onSliderChange}
          />
        </div>
      )
    );

    return (
      <div>
        <div>
          <div> {createSliders} </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    year: state.YearSelectorReducer.yearSelected,
    attribute: state.AttributeRangeReducer
  };
};
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributeRange);
