import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
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
    const { searchPhrase } = this.props;
    const searchBoxContainerClasses = classNames({
      'justify-content-center': true,
      'd-none': searchPhrase === ''
    });
    return (
      <Navbar style={navbarStyle} expand="md" className="fixed-top">
        <NavbarBrand className="text-primary" style={navBrandStyle}>
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
          <Container>
            <Row className={searchBoxContainerClasses}>
              <Col md={10} lg={7}>
                <LocationSearchBox />
              </Col>
            </Row>
          </Container>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Explore
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/stories">
                Stories
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/approve">
                Admin
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = store => ({
  searchPhrase: store.LocationSearchBoxReducer.value
});

export default withRouter(connect(mapStateToProps)(Header));
