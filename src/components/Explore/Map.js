import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';

import mapStyles from './mapStyles.json';

class Map extends Component {
  state = {
    markers: [],
    center: {
      lat: 37.09024,
      lng: -95.712891
    },
    zoom: 5
  };

  handleApiLoaded = (map, maps) => {
    // console.log(map, maps);
    map.setOptions({
      styles: mapStyles
    });
    this.map = map;
    this.maps = maps;
  };

  componentWillReceiveProps(nextProps) {
    const geocoder = new this.maps.Geocoder();
    const markersPromises = nextProps.suggestions.map(currentSuggestion => {
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: currentSuggestion }, (results, status) => {
          if (status === 'OK') {
            console.log(results);
            resolve(results[0].geometry.location.lat());
          } else {
            reject(results);
          }
        });
      });
    });
    Promise.all(markersPromises).then(markers => console.log(markers));
    // this.setState({ markers });
  }

  render() {
    console.log(this.state);
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

const mapStateToProps = store => ({
  suggestions: store.LocationSearchBoxReducer
});
export default connect(mapStateToProps)(Map);
