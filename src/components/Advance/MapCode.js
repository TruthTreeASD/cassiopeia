import React, { Component } from 'react';
import '../../styles/SimilarPlacesSearch.css';

class MapCode extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="map-code" style={{ backgroundColor: this.props.color }} />
    );
  }
}

export default MapCode;
