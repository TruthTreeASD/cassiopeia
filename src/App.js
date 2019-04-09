import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import About from './components/About';
import Explore from './components/Explore';
import Stories from './components/Stories';
import Admin from './components/Admin';
import SideMenu from './components/SideMenu';
import Advance from './components/Advance';

import './App.css';
import './styles/Tab.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="d-flex flex-column">
          <Header />
          <SideMenu />
          <Switch>
            <Route exact path="/" component={Explore} />
            <Route exact path="/stories" component={Stories} />
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/advance" component={Advance} />
            <Route exact path="/explore/:level/:name/:id" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
