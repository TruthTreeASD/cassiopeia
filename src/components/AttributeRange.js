import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { connect } from 'react-redux';
import axios from 'axios';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../styles/AttributeRange.css';

class AttributeRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populationRange: [],
      locationPopulation: null
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

  render() {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const Handle = Slider.Handle;

    const handle = props => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };

    const wrapperStyle = { width: 400, margin: 50 };

    const createSliders = this.props.attribute.attributeName.map(
      (currentAttribute, i) => (
        <div key={i}>
          <p>
            {currentAttribute} of {this.props.location} {':  '}
            <b>{this.state.locationPopulation}</b>
          </p>
          <p>Select Range of {currentAttribute}:</p>
          <p className="Note"> (*range in percentage)</p>
          {currentAttribute}
          <Range
            min={-50}
            max={50}
            defaultValue={[-5, 5]}
            tipFormatter={value => value}
          />
        </div>
      )
    );

    return (
      <div>
        <div style={wrapperStyle}>
          <div> {createSliders} </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    attribute: state.AtrributeRangeReducer
  };
};

export default connect(mapStateToProps)(AttributeRange);
