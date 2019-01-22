import React, { Component } from 'react';
import DisplayComponent from './DisplayComponent';
import Header from './Header';
import FilterBy from './FilterBy';

class Home extends Component {
  render() {
    return (
      <div>
        <Header />

        <FilterBy />

        <DisplayComponent />
      </div>
    );
  }
}

export default Home;
