import React, { Component } from 'react';
import '../styles/LeftSideBar.css';

import citiesData from '../../src/testStuff/cities.json';
import statesData from '../../src/testStuff/states.json';
import countiesData from '../../src/testStuff/counties.json';
import { connect } from 'react-redux';

import { combineReducers, createStore } from 'redux';

function levelReducer(state = [], action) {
  return 'State';
}
function attributeReducer(state = [], action) {
  return 'State';
}

const allReducers = combineReducers({
  level: levelReducer,
  attributes: attributeReducer
});

const store = createStore(allReducers, {
  level: 'states',
  attributes: [] //api call
});

console.log(store.getSate());

class redux extends Component {
  constructor(props) {
    super(props);
    //   /api/collections?level=state
    this.state = { sidebarData: statesData };
    // Set initial state of each collection to false
    Object.keys(this.state.sidebarData).map(key => (this.state[key] = false));
  }
  render() {
    return <div />;
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(redux);
