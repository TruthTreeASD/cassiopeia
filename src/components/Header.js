import React, { Component } from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap';
import { Link } from 'react-router-dom';

import '../styles/Header.css';
import logo from '../truthtree-logo.png';
import { connect } from 'react-redux';

const logoStyle = {
  width: 50
};

class Header extends Component {
  state = {
    collapseOpen: false
  };

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand>
          <Link to="/">
            <img
              src={logo}
              style={logoStyle}
              class="d-inline-block"
              alt="TruthTree logo"
            />
          </Link>
          &nbsp;TruthTree
        </NavbarBrand>
        <NavbarToggler
          onClick={() =>
            this.setState({ collapseOpen: !this.state.collapseOpen })
          }
        />
        <Collapse isOpen={this.state.collapseOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Trending
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/explore">
                Explore
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapState = state => ({
  dimension: state.FilterByReducer.dimension
});

export default connect(mapState)(Header);
