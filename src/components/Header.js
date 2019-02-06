import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import '../styles/Header.css';
import logo from '../TruthTree.jpeg';
import { connect } from 'react-redux';

const divStyle = {
  width: '110px',
  height: '45px',
  float: 'left'
};

class Header extends Component {
  render() {
    return (
      <Navbar className="header">
        <NavbarBrand
          className="d-flex align-items-center"
          style={{ fontSize: '2.5rem' }}
        >
          <img style={divStyle} src={logo} alt="My logo" />
        </NavbarBrand>
      </Navbar>
    );
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(Header);
