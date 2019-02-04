import React, { Component } from 'react';
import '../styles/LeftSideBar.css';
import axios from 'axios';
import citiesData from '../../src/testStuff/cities.json';
import statesData from '../../src/testStuff/states.json';
import countiesData from '../../src/testStuff/counties.json';
import { connect } from 'react-redux';

import { combineReducers, createStore } from 'redux';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    //   /api/collections?level=state
    this.state = {
      sidebarData: statesData,
      isLoaded: false
    };
    // Set initial state of each collection to false
    Object.keys(this.state.sidebarData).map(key => (this.state[key] = false));
  }
  // each of these will need a diff api
  componentWillReceiveProps(nextProps) {
    if (nextProps.dimension === 'State') {
      axios
        .get('/api/collections')
        .then(response => {
          //data contains the variables
          console.log(response.data);
          this.setState({
            sidebarData: response.data,
            isLoaded: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (nextProps.dimension === 'City') {
      axios
        .get('/api/collections')
        .then(response => {
          //data contains the variables
          console.log(response.data);
          this.setState({
            sidebarData: response.data,
            isLoaded: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .get('/api/collections')
        .then(response => {
          //data contains the variables
          console.log(response.data);
          this.setState({
            sidebarData: response.data,
            isLoaded: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    axios
      .get('/api/collections')
      .then(response => {
        //data contains the variables
        console.log(response.data);
        this.setState({
          sidebarData: response.data,
          isLoaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Toggle state of each collection on click
  handleClick = collection => {
    console.log('Clicked!!', collection, this.state[collection]);
    this.setState({ [collection]: !this.state[collection] });
  };

  render() {
    var { isLoaded, sidebarData } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          {Object.keys(this.state.sidebarData).map((collection, i) => {
            return (
              <div>
                <div
                  className="accordion"
                  onClick={() => this.handleClick(collection)}
                >
                  {this.state.sidebarData[collection].name}
                </div>
                <div
                  style={{ display: this.state[collection] ? 'block' : 'none' }}
                >
                  {Object.keys(
                    this.state.sidebarData[collection].properties
                  ).map((attr, i) => {
                    return (
                      <label className="panel float-right">
                        <p>
                          {
                            this.state.sidebarData[collection].properties[attr]
                              .name
                          }
                          <label className="switch float-right">
                            <input type="checkbox" />
                            <span className="slider round" />
                          </label>
                        </p>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      );
    }
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(LeftSideBar);
