import React, { Component } from 'react';

import Map from './Map';
import Intro from './Intro';

const exploreStyle = {
  flex: '1 1 100%'
};

class Explore extends Component {
  render() {
    return (
      <div
        style={exploreStyle}
        className="d-flex align-items-center position-relative"
      >
        <Map />
        <Intro />
      </div>
    );
  }
}

export default Explore;
