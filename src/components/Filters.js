import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { connect } from 'react-redux';

class Filters extends Component {
  constructor(props) {
    super(props);
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

    return (
      <div>
        <div style={wrapperStyle}>
          <p>Income</p>
          <Slider min={0} max={100000} defaultValue={50000} handle={handle} />
        </div>
        <div style={wrapperStyle}>
          <p>Income</p>
          <Slider
            min={0}
            defaultValue={50000}
            marks={{
              10: 10000,
              20: 20000,
              30: 30000,
              40: 40000,
              50: 50000,
              60: 60000,
              70: 70000,
              80: 80000,
              90: 90000,
              100: 100000
            }}
            step={null}
          />
        </div>
        <div style={wrapperStyle}>
          <p>Income</p>
          <Range
            min={0}
            max={100000}
            defaultValue={[20000, 50000]}
            tipFormatter={value => `${value}%`}
          />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(Filters);
