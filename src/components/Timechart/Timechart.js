import React, { Component } from 'react';
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler,
  Legend,
  Resizable
} from 'react-timeseries-charts';

import { TimeRange, TimeSeries } from 'pondjs';

const series = new TimeSeries({
  name: 'General Expenditure',
  columns: ['index', 'location 1', 'location 2'],
  points: buildPoints()
});

function buildPoints() {
  const location1Points = [
    ['2010', '0.6'],
    ['2011', '0.8'],
    ['2012', '1.0'],
    ['2013', '0.6'],
    ['2014', '1.0'],
    ['2015', '1.5'],
    ['2016', '1.2']
  ];
  const location2Points = [
    ['2010', '0.8'],
    ['2011', '0.7'],
    ['2012', '1.2'],
    ['2013', '0.8'],
    ['2014', '1.4'],
    ['2015', '1.3'],
    ['2016', '1.2']
  ];
  let points = [];
  for (let i = 0; i < location1Points.length; i++) {
    points.push([
      location1Points[i][0],
      location1Points[i][1],
      location2Points[i][1]
    ]);
  }
  console.log(points);
  return points;
}

const style = styler([
  { key: 'location 1', color: 'red', width: 2.5 },
  { key: 'location 2', color: '#F68B24', width: 2.5 }
]);

export default class Timechart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      range: series.range(),
      series: series,
      width: 200
    };
  }

  render() {
    return (
      <div>
        <ChartContainer
          title="General Expenditure"
          titleStyle={{ fill: '#555', fontWeight: 500, fontSize: '18px' }}
          enablePanZoom={true}
          timeRange={this.state.range}
          width={800}
        >
          <ChartRow height="300">
            <YAxis
              id="y"
              label="Values in USD"
              hideAxisLine
              showGrid
              min={0.5}
              max={1.5}
              width="80"
              type="linear"
              format=".2f"
              style={{
                label: { fontWeight: 600, fontSize: '20px', fill: '#555' },
                values: {
                  stroke: 'none',
                  fill: '#8B7E7E',
                  fontWeight: 200,
                  fontSize: 15,
                  font: '"Goudy Bookletter 1911", sans-serif"'
                },
                ticks: { fill: 'none', stroke: '#C0C0C0' },
                axis: { fill: 'none', stroke: '#C0C0C0' }
              }}
            />
            <Charts>
              <LineChart
                axis="y"
                series={this.state.series}
                columns={['location 1', 'location 2']}
                breakLine={false}
                style={style}
                interpolation="curveBasis"
              />
            </Charts>
          </ChartRow>
        </ChartContainer>

        <div className="row">
          <div className="col-lg-7">
            <span>
              <Legend
                type="line"
                align="right"
                style={style}
                categories={[
                  { key: 'location 1', label: 'MA' },
                  { key: 'location 2', label: 'WA' }
                ]}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
