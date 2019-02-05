import React, { Component } from 'react';
import '../styles/DisplayComponent.css';
import classNames from 'classnames';
import Filters from './AttributeRange';
import CloroplethMap from './CloroplethMap';
import CustomBarChart from './CustomBarChart';
import { connect } from 'react-redux';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { displayComponent: 'Map', zoom: 1 };
    this.handleClick = this.handleClick.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  handleClick(newState) {
    this.setState({ displayComponent: newState });
  }

  zoomIn() {
    this.setState({ zoom: this.state.zoom + 0.25 });
  }

  zoomOut() {
    this.setState({ zoom: this.state.zoom - 0.25 });
  }

  render() {
    var display;
    var mapBtn = classNames('displayButtons', {
      'btn-primary': this.state.displayComponent === 'Map'
    });
    var ChartBtn = classNames('displayButtons', {
      'btn-primary': this.state.displayComponent === 'Chart'
    });
    if (this.state.displayComponent === 'Chart') {
      display = <CustomBarChart zoom={this.state.zoom} />;
    } else {
      display = <CloroplethMap zoom={this.state.zoom} data={[['CA', 70]]} />;
    }
    return (
      <div class="display">
        <button className={mapBtn} onClick={() => this.handleClick('Map')}>
          {' '}
          Map{' '}
        </button>
        <button className={ChartBtn} onClick={() => this.handleClick('Chart')}>
          {' '}
          Chart{' '}
        </button>
        <div className="displayArea">{display}</div>
        <button onClick={() => this.zoomIn()}>+</button>
        <button onClick={() => this.zoomOut()}>-</button>
        <Filters />
      </div>
    );
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(DisplayComponent);
