import React, { Component } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import { connect } from 'react-redux';
import '../../styles/TimeSeries.css';

const stroke = ['red', 'blue', 'green', 'purple', 'orange', 'grey', 'yellow'];

class TimeSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('In Render');
    console.log(this.props.locations);
    console.log(this.props.data);
    this.props.data.reverse();

    const attributeName = this.props.attributeName;

    return (
      <div className="chartDiv">
        <div> {this.props.attributeName} </div>
        <LineChart
          width={900}
          height={500}
          data={this.props.data}
          margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
        >
          <CartesianGrid
            className="chartDiv"
            stroke="#ccc"
            strokeDasharray="5 5"
            padding={{ left: 20, right: 20 }}
          />
          <XAxis dataKey="year" label="Year" />
          <YAxis
            label={{ value: 'Population', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend verticalAlign="bottom" iconSize={10} />
          {this.props.locations.map((location, i) => (
            <Line
              key={location.id}
              type="monotone"
              dataKey={location.name}
              stroke={location.color}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </div>
    );
  }
}

export default TimeSeries;
