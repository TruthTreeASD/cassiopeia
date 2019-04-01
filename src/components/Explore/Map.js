import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import { getSuggestionLabel, getSuggestionUrl } from './common';

import mapStyles from './mapStyles.json';

const mapContainerStyle = {
  height: '100%',
  width: '100%'
};

class Map extends Component {
  state = {
    center: {
      lat: 37.09024,
      lng: -95.712891
    },
    zoom: 5,
    markers: []
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.suggestions, nextProps.suggestions)) {
      this.renderMarkers(nextProps.suggestions);
    }
  }

  renderMarkers = suggestions => {
    if (this.map && this.maps) {
      this.setMarkersMap(this.state.markers, null);
      const markers = suggestions.map(suggestion => {
        const marker = new this.maps.Marker({
          position: {
            lat: suggestion.latitude,
            lng: suggestion.longitude
          },
          map: this.map,
          animation: this.maps.Animation.DROP
        });
        const infowindow = new this.maps.InfoWindow({
          content: `
            <div>
              ${getSuggestionLabel(suggestion)}
            </div>
          `,
          maxWidth: 200
        });
        infowindow.open(this.map, marker);
        marker.addListener('click', () => {
          infowindow.open(this.map, marker);
          this.props.history.push(getSuggestionUrl(suggestion));
        });
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
    this.renderMarkers(this.props.suggestions);
  };

  render() {
    return (
      <div style={mapContainerStyle} className="position-absolute">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD6S0fXIE22l64bV3nhv-EB-7K1gh39nqs' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  suggestions: store.LocationSearchBoxReducer.suggestions
});

export default withRouter(connect(mapStateToProps)(Map));
