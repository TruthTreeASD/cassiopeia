import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { connect } from 'react-redux';

class AttributeRange extends Component {
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

    const createSliders = this.props.attribute.attributeName.map(
      currentAttribute => (
        <p>
          {currentAttribute}
          <Range
            min={0}
            max={100}
            defaultValue={[20, 50]}
            tipFormatter={value => value}
          />
        </p>
      )
    );

    return (
      <div>
        <div style={wrapperStyle}>
          <p> {createSliders} </p>
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

const mapDispatchToProps = dispatch => {
  /* return {
    setAttribute: (name) =>{
      dispatch({
        type: "addAttribute",
        payload: name

      })

     setAttribute: () =>{
      dispatch({
        type: "addAttribute",
        payload: "Alcohol Tax"

      })
    }
  };
  */
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributeRange);
