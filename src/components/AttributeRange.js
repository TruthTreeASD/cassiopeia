import React, { Component } from 'react';
import Slider from 'rc-slider';
import { connect } from 'react-redux';
import axios from 'axios';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../styles/AttributeRange.css';

const Range = Slider.Range;

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
    let url = '/api/' + this.props.level + '/' + this.props.locationId;
    console.log(url);
    let locPop = null;

    axios
      .get(url)
      .then(res => {
        locPop = res.data.population;
        console.log(res.data.population);
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
        <div key={i}>
          <p>
            {currentAttribute} of {this.props.location} {':  '}{' '}
            <b>{this.state.locationPopulation}</b>
          </p>
          <p>
            Select range of <b>{currentAttribute}</b> for filtering other{' '}
            <b>{this.props.level}</b>:
          </p>
          <p className="Note">
            (*range selection available from -50% to +50% wrt to{' '}
            {this.props.location} {currentAttribute})
          </p>

          <Range
            dots
            step={5}
            value={this.props.attribute.populationRange}
            min={this.state.min}
            max={this.state.max}
            onChange={this.onSliderChange}
          />

          <p>
            Current selection: {this.props.attribute.populationRange[0]}% to{' '}
            {this.props.attribute.populationRange[1]}% :
          </p>
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
    attribute: state.AttributeRangeReducer
  };
};
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributeRange);
