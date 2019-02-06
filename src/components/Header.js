import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import '../styles/Header.css';
import logo from '../NEU-logo.png';
import { connect } from 'react-redux';
import FilterBy from './FilterBy';

const divStyle = {
  width: '50px',
  height: '50px',
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
          <>&nbsp;TruthTree</>
          <div className="col-12 col-md-10 align-items-center">
            <FilterBy />
          </div>
        </NavbarBrand>
      </Navbar>
    );
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(Header);
