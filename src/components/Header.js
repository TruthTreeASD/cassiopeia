import React, { Component } from 'react';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  NavbarToggler
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import LocationSearchBox from './Explore/LocationSearchBox';
import { openSideMenu } from '../actions/SideMenuActions';

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

const searchBoxContainerStyle = {
  maxWidth: 800
};

class Header extends Component {
  state = {
    collapseOpen: false
  };

  shouldShowSearchBox = () => {
    const { searchPhrase, location } = this.props;
    return location.pathname === '/' && searchPhrase !== '';
  };

  render() {
    const searchBoxContainerClasses = classNames({
      'flex-grow-1': true,
      'd-none': !this.shouldShowSearchBox()
    });
    const { collapseOpen } = this.state;
    return (
      <Navbar
        style={navbarStyle}
        expand="md"
        className="fixed-top space-between"
      >
        <NavbarBrand className="text-primary" style={navBrandStyle}>
          <Link to="/">
            <img
              src={logo}
              style={logoStyle}
              className="d-inline-block"
              alt="TruthTree logo"
            />
            <span>&nbsp;TruthTree</span>
          </Link>
        </NavbarBrand>
        <NavbarToggler
          className="navbar-dark"
          onClick={() => this.setState({ collapseOpen: !collapseOpen })}
        />
        <Collapse isOpen navbar>
          <div className="d-flex flex-grow-1 justify-content-center">
            <div
              style={searchBoxContainerStyle}
              className={searchBoxContainerClasses}
            >
              <LocationSearchBox />
            </div>
          </div>
        </Collapse>
        <Collapse isOpen={collapseOpen} navbar className="flex-grow-0">
          <Nav
            className="ml-auto px-md-3"
            navbar
            onClick={() => this.setState({ collapseOpen: false })}
          >
            <NavItem>
              <NavLink
                className="d-flex justify-content-center"
                tag={Link}
                to="/"
              >
                Explore
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="d-flex justify-content-center"
                tag={Link}
                to="/stories"
              >
                Stories
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="d-flex justify-content-center"
                tag={Link}
                to="/about"
              >
                About
              </NavLink>
            </NavItem>
          </Nav>
          <div>
            <Button
              color="outline-primary"
              block
              onClick={() => {
                this.setState({ collapseOpen: false });
                this.props.dispatch(openSideMenu());
              }}
            >
              Create a story
            </Button>
          </div>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = store => ({
  searchPhrase: store.LocationSearchBoxReducer.value
});

export default withRouter(connect(mapStateToProps)(Header));
