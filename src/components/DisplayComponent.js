import React, { Component } from 'react';
import '../styles/DisplayComponent.css';
import classNames from 'classnames';
import Filters from './Filters';
import CloroplethMap from './CloroplethMap';
import CustomBarChart from './CustomBarChart';
import { connect } from 'react-redux';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { displayComponent: 'Map' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(newState) {
    this.setState({ displayComponent: newState });
  }

  render() {
    var display;
    var mapBtn = classNames('DisplayButtons', {
      'btn-primary': this.state.displayComponent === 'Map'
    });
    var ChartBtn = classNames('DisplayButtons', {
      'btn-primary': this.state.displayComponent === 'Chart'
    });
    if (this.state.displayComponent === 'Chart') {
      display = <CustomBarChart />;
    } else {
      display = <CloroplethMap data={[['CA', 70]]} />;
    }
    return (
      <div>
        <button className={mapBtn} onClick={() => this.handleClick('Map')}>
          {' '}
          Map{' '}
        </button>
        <button className={ChartBtn} onClick={() => this.handleClick('Chart')}>
          {' '}
          Chart{' '}
        </button>
        <div className="DisplayArea">{display}</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Filters />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(DisplayComponent);
