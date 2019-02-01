import React, { Component } from 'react';
import '../styles/DisplayComponent.css';
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
    if (this.state.displayComponent === 'Chart') {
      display = <CustomBarChart />;
    } else {
      display = <CloroplethMap data={[['CA', 70]]} />;
    }
    return (
      <div>
        <button
          className="DisplayButtons"
          onClick={() => this.handleClick('Map')}
        >
          {' '}
          Map{' '}
        </button>
        <button
          className="DisplayButtons"
          onClick={() => this.handleClick('Chart')}
        >
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
