import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import Home from './components/Home';
import Header from './components/Header';
import LeftSideBar from './components/LeftSideBar';
import './App.css';
import './styles/Tab.css';
import Tabs from './components/Tabs';

const styles = {
  minHeight: '100vh'
};

class App extends Component {
  render() {
    return (
      <div className="d-flex flex-column" style={styles}>
        <Header />
        <Tabs>
          <div label="Home">ML content here!</div>
          <div label="Attribute Explore">
            <Container className="d-flex flex-grow-1" fluid={true}>
              <Home />
            </Container>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default App;
