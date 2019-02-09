import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Home from './components/Home';
import Header from './components/Header';
import Trending from './components/Trending';
import Explore from './components/Explore';

import './App.css';
import './styles/Tab.css';

const styles = {
  minHeight: '100vh'
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="d-flex flex-column" style={styles}>
          <Header />
          <Route exact path="/" component={Trending} />
          <Route path="/explore" component={Explore} />
          <Route path="/explore/:location" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
