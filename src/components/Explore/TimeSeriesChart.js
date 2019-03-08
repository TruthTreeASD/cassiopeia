import React, { Component } from 'react';
import { Badge } from 'reactstrap';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import '../../styles/TimeSeries.css';

class TimeSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const attributeName = this.props.attributeName;
    if (this.props.condition === 'large') {
      return (
        <div className="chartDiv">
          <Badge color="info" className="popupHeader">
            {this.props.collectionName} - {this.props.attributeName}
          </Badge>
          <LineChart
            width={1050}
            height={450}
            data={this.props.data}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <CartesianGrid
              className="chartDiv"
              stroke="#ccc"
              strokeDasharray="5 5"
              padding={{ left: 20, right: 20 }}
            />
            <XAxis
              dataKey="year"
              label={{
                value: 'Year',
                position: 'insideBottom'
              }}
            />
            <YAxis
              label={{
                value: attributeName,
                angle: -90,
                position: 'insideLeft'
              }}
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
    } else {
      return (
        <div className="chartDiv">
          <Badge color="info">
            {' '}
            {this.props.collectionName} - {this.props.attributeName}{' '}
          </Badge>
          <LineChart
            width={495}
            height={200}
            data={this.props.data}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <CartesianGrid
              className="chartDiv"
              stroke="#ccc"
              strokeDasharray="5 5"
              padding={{ left: 20, right: 20 }}
            />
            <XAxis
              dataKey="year"
              label={{
                value: 'Year',
                position: 'insideBottom'
              }}
            />
            <YAxis
              label={{
                value: attributeName,
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip />
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
}

export default TimeSeries;
