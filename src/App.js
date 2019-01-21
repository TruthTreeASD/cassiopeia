import React, { Component } from "react";

import Home from "./components/Home";
import LeftSideBar from "./components/LeftSideBar";
import './App.css';

class App extends Component {
  render() {
      return       (
          <div>
              <Home />
              <LeftSideBar />
          </div>
      )
  }
}

export default App;
