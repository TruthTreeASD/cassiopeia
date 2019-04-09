import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../reducers/RootReducer';
import USAMap from './USAMap';
import { Row, Col } from 'reactstrap';

class SimilarPlacesResponse extends Component {
  constructor(props) {
    super(props);
    this.renderResponse = this.renderResponse.bind(this);
  }

  renderResponse() {
    return this.props.locations.map(location => (
      <div className="list-group-item">{location.name}</div>
    ));
  }

  render() {
    return (
      <div className="container-fluid">
        {this.props.locations.length != 0 && (
          <div>
            <Row>
              <span
                className="text-secondary"
                style={{
                  paddingLeft: '20px',
                  paddingBottom: '20px',
                  fontSize: '20px'
                }}
              >
                We have found these locations which are similar to your location
                of interest!
              </span>
            </Row>
            <Row>
              <Col sm={12} lg={10} md={10}>
                <USAMap />
              </Col>
              <Col sm={12} lg={2} md={2}>
                <div className="list-group">{this.renderResponse()}</div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.SimilarLocationsReducer.locations
  };
};

export default connect(mapStateToProps)(SimilarPlacesResponse);
