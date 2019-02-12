import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Trending from './components/Trending';
import Explore from './components/Explore';

import './App.css';
import './styles/Tab.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="d-flex flex-column">
          <Header className="flex-grow-0 flex-shrink-0" />
          <Switch>
            <Route exact path="/" component={Trending} />
            <Route exact path="/explore" component={Explore} />
            <Route exact path="/explore/:level/:name/:id" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
