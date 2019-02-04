import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import Home from './components/Home';
import Header from './components/Header';
import LeftSideBar from './components/LeftSideBar';
import './App.css';

const styles = {
  minHeight: '100vh'
};

class App extends Component {
  render() {
    return (
      <div className="d-flex flex-column" style={styles}>
        <Header />
        <Container className="d-flex flex-grow-1" fluid={true}>
          <Home />
        </Container>
      </div>
    );
  }
}

export default App;
