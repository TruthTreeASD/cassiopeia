import React, { Component } from 'react';
import Timechart from './Timechart';

export default class TimechartContainer extends Component {
  constructor(props) {
    super(props);
    this.displayTimeCharts = this.displayTimeCharts.bind(this);
    this.state = {};
  }

  displayTimeCharts() {
    return <Timechart />;
  }

  render() {
    return <div>{this.displayTimeCharts()}</div>;
  }
}
