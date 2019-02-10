import React, { Component } from 'react';
import { Row } from 'reactstrap';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';

class Trending extends Component {
  render() {
    return (
      <Row className="flex-grow-1 flex-shrink-1">
        <img src={logo} size="100px" />
        <Link to="/explore/">Explore</Link>
        <div>Time Series</div>
      </Row>
    );
  }
}

export default Trending;
