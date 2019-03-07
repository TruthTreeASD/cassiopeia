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

const logoStyle = {
  width: 50
};

class Header extends Component {
  state = {
    collapseOpen: false
  };

  render() {
    return (
      <Navbar color="light" light expand="md" className={this.props.className}>
        <NavbarBrand>
          <Link to="/">
            <img
              src={logo}
              style={logoStyle}
              className="d-inline-block"
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
            <NavItem className="border-right">
              <NavLink tag={Link} to="/explore">
                Explore
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about">
                About
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
