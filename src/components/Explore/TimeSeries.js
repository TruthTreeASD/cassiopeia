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
const data = [
  { name: '1967', uv: 400, pv: 1200 },
  { name: '1969', uv: 200, pv: 2400 },
  { name: '2005', uv: '', pv: 2000 },
  { name: '2010', uv: 300, pv: 1500 }
];

class TimeSeries extends Component {
  render() {
    return (
      <div>
        <LineChart
          width={400}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}

export default TimeSeries;
