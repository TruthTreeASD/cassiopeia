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
  { year: '1967', location1: 400, location2: 1200 },
  { year: '1969', location1: 200, location2: 2400 },
  { year: '2005', location1: 700, location2: 2000 },
  { year: '2010', location1: 300, location2: 1500 }
];

class TimeSeries extends Component {
  render() {
    console.log('In Render');
    let rows = data.length;
    let cols = Object.keys(data[0]).length;
    console.log('Rows is ' + rows);
    console.log('Cols is ' + cols);

    // const createLine => (
    //     <div key={i}>
    //
    //     </div>
    //   )
    // );
    return (
      <div>
        <LineChart
          width={400}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="location1"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="location2" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}

export default TimeSeries;
