import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class CustomBarChart extends Component {
  render() {
    return (
      <BarChart
        width={600}
        height={300}
        data={[
          { name: 'California', uv: 4000, pv: 2400, amt: 2400 },
          { name: 'Texas', uv: 3000, pv: 1398, amt: 2210 },
          { name: 'Florida', uv: 2000, pv: 9800, amt: 2290 },
          { name: 'Alaska', uv: 1890, pv: 4800, amt: 2181 },
          { name: 'Washington', uv: 2390, pv: 3800, amt: 2500 },
          { name: 'Ohio', uv: 3490, pv: 4300, amt: 2100 }
        ]}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
      </BarChart>
    );
  }
}

export default CustomBarChart;
