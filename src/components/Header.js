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

const navbarStyle = {
  backgroundColor: 'rgba(13, 22, 38, 0.8)'
};

const navBrandStyle = {
  '&:hover': {
    textDecoration: 'none'
  }
};

const logoStyle = {
  width: 50
};

class Header extends Component {
  state = {
    collapseOpen: false
  };

  render() {
    return (
      <Navbar style={navbarStyle} expand="md" className="fixed-top">
        <NavbarBrand style={navBrandStyle}>
          <Link to="/">
            <img
              src={logo}
              style={logoStyle}
              className="d-inline-block"
              alt="TruthTree logo"
            />
            &nbsp;TruthTree
          </Link>
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
