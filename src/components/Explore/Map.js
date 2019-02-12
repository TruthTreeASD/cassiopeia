import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import mapStyles from './mapStyles.json';

class Map extends Component {
  state = {
    center: {
      lat: 37.09024,
      lng: -95.712891
    },
    zoom: 5
  };

  handleApiLoaded = (map, maps) => {
    console.log(map, maps);
    map.setOptions({
      styles: mapStyles
    });
  };

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyD6S0fXIE22l64bV3nhv-EB-7K1gh39nqs' }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
      />
    );
  }
}
export default Map;
