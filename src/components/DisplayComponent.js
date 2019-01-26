import React, { Component } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import '../styles/DisplayComponent.css';
import Filters from './Filters';
import testTable from '../../src/testStuff/cities.json';

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
        <div className="DisplayArea">
          <BarChart
            width={600}
            height={300}
            data={[
              { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
              { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
              { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
              { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
              { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
              { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
              { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
            ]}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
          </BarChart>
        </div>
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

export default DisplayComponent;
