import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

import '../styles/Header.css';
import logo from '../TruthTreeLogo.png';
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
          <Row className="align-items-center">
            <Col sm={{ size: 2, order: 1 }}>
              <img style={divStyle} src={logo} alt="My logo" />
              <>&nbsp;</>
            </Col>
            <Col sm={{ size: 4, order: 2, offset: 1 }}>TruthTree</Col>
          </Row>
          {/*<div className="col-12 col-md-10 align-items-center">
            <FilterBy />
          </div>*/}
        </NavbarBrand>
      </Navbar>
    );
  }
}

const mapState = state => ({
  dimension: state.FilterByReducer.dimension
});

export default connect(mapState)(Header);
