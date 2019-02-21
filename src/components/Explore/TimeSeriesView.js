import React, { Component } from 'react';
import TimeSeriesChart from './TimeSeriesChart';

class TimeSeriesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { year: '1967', location1: 400, location2: 1200, location0: 200 },
        { year: '1969', location1: 200, location2: 2400, location0: 100 },
        { year: '1971', location1: 700, location2: 2000, location0: 50 },
        { year: '1973', location1: 300, location2: 3000, location0: 25 },
        { year: '1975', location1: 300, location2: 3000, location0: 25 },
        { year: '1977', location1: 300, location2: 3000, location0: 25 },
        { year: '1979', location1: 300, location2: 3000, location0: 25 },
        { year: '1981', location1: 300, location2: 3000, location0: 25 },
        { year: '1983', location1: 300, location2: 3000, location0: 25 },
        { year: '1985', location1: 300, location2: 3000, location0: 25 },
        { year: '1987', location1: 300, location2: 3000, location0: 25 },
        { year: '1989', location1: 300, location2: 3000, location0: 25 }
      ],

      locations: [
        { id: 'location0', name: 'location0', color: 'red' },
        { id: 'location1', name: 'location1', color: 'blue' },
        { id: 'location2', name: 'location2', color: 'purple' }
      ]
    };
  }

  render() {
    return (
      <TimeSeriesChart
        data={this.state.data}
        attributeName="Population"
        locations={this.state.locations}
      />
    );
  }
}

export default TimeSeriesView;
