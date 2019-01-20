import React, { Component } from "react";

import Home from "./components/Home";
import Red from "./components/Red";
import './App.css';

class App extends Component {
  render() {
      return       (
          <div>
              <Home />
              <Red />
          </div>
      )
  }
}

export default App;
