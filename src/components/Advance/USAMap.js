import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import mapStyles from '../Explore/mapStyles';

const mapContainerStyle = {
  height: 500
};

class USAMap extends Component {
  state = {
    center: {
      lat: 37.09024,
      lng: -95.712891
    },
    markerClicked: false,
    zoom: 0,
    markers: []
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.locations, nextProps.locations)) {
      this.renderMarkers(nextProps.locations);
    }
  }

  renderMarkers = locations => {
    if (this.map && this.maps) {
      this.setMarkersMap(this.state.markers, null);
      const markers = locations.map(location => {
        const marker = new this.maps.Marker({
          position: {
            lat: location.latitude,
            lng: location.longitude
          },
          map: this.map,
          animation: this.maps.Animation.DROP
        });
        const infowindow = new this.maps.InfoWindow({
          content: `
            <div>
              ${location.name}
            </div>
          `,
          maxWidth: 200
        });
        // infowindow.open(this.map, marker);
        marker.addListener('mouseover', () => {
          infowindow.open(this.map, marker);
        });
        return marker;
      });
      this.setState({ markers });
    }
  };

  setMarkersMap = (markers, map) => {
    markers.forEach(marker => marker.setMap(map));
  };

  handleApiLoaded = (map, maps) => {
    this.maps = maps;
    this.map = map;
    map.setOptions({
      styles: mapStyles,
      fullscreenControlOptions: {
        position: maps.ControlPosition.BOTTOM_RIGHT
      }
    });
    this.renderMarkers(this.props.locations);
  };

  render() {
    return (
      <div style={mapContainerStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyD6S0fXIE22l64bV3nhv-EB-7K1gh39nqs'
          }}
          defaultCenter={this.state.center}
          defaultZoom={4.5}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  locations: store.SimilarLocationsReducer.locations
});

export default withRouter(connect(mapStateToProps)(USAMap));
