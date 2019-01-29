import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/FilterBy.css';

class FilterBy extends Component {
  constructor(params) {
    super(params);
    this.setDimension = this.setDimension.bind(this);
  }

  setDimension(e) {
    this.props.dispatch({
      type: 'CHANGE_DIMENSION',
      value: e.target.value
    });
  }

  render() {
    return (
      <div className="FilterBy">
        Select the dimension to be filtered by:
        <div className="RadioButtons">
          <input
            type="radio"
            checked={this.props.dimension === 'City'}
            onClick={this.setDimension}
            value="City"
          />{' '}
          City &nbsp;
          <input
            type="radio"
            checked={this.props.dimension === 'County'}
            onClick={this.setDimension}
            value="County"
          />{' '}
          County &nbsp;
          <input
            type="radio"
            checked={this.props.dimension === 'State'}
            onClick={this.setDimension}
            value="State"
          />{' '}
          State
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

const mapDispatch = dispatch => ({ dispatch });
export default connect(
  mapState,
  mapDispatch
)(FilterBy);
