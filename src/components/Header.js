import React, { Component } from 'react';
import '../styles/Header.css';
import logo from '../NEU-logo.png';

const divStyle = {
  width: '50px',
  height: '50px',
  float: 'left'
};

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img style={divStyle} src={logo} alt="My logo" />
        <>&nbsp;TruthTree</>
      </div>
    );
  }
}

export default Header;
