import React, { Component } from 'react';
import '../styles/LeftSideBar.css';
import _ from 'lodash';
import axios from 'axios';
//import citiesData from '../../src/testStuff/cities.json';
//import statesData from '../../src/testStuff/states.json';
//import countiesData from '../../src/testStuff/counties.json';
import { connect } from 'react-redux';

import { TRUTHTREE_URI } from '../constants';

class LeftSideBar extends Component {
  constructor(params) {
    super(params);
    //   /api/collections?level=state
    this.state = {
      sidebarData: [],
      isLoaded: false,
      selectedAttributes: []
    };
    // Set initial state of each collection to false
    Object.keys(this.state.sidebarData).map(key => (this.state[key] = false));
  }
  // each of these will need a diff api
  componentWillReceiveProps(nextProps) {
    if (nextProps.dimension === 'State') {
      axios
        .get(`${TRUTHTREE_URI}/api/collections?level=state`)
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
        .get(`${TRUTHTREE_URI}/api/collections?level=city`)
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
        .get(`${TRUTHTREE_URI}/api/collections?level=county`)
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
      .get(`${TRUTHTREE_URI}/api/collections?level=state`)
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
  handleClickCollection = collection => {
    console.log('Clicked!!', collection, this.state[collection]);
    this.setState({ [collection]: !this.state[collection] });
  };

  // stores attribute selected
  handleClickAttribute = attribute => {
    //console.log('====' + this.state.selectedAttributes);
    //console.log(attribute.property_id);
    let newArr = this.state.selectedAttributes;
    if (_.includes(newArr, attribute.property_id)) {
      //this needs to be replaced with add and remove

      // uncomment this to remove. I commented this because added item is getting removed on second call
      _.remove(newArr, elem => {
        return elem === attribute.property_id;
      });
    } else {
      newArr.push(attribute.property_id);
      // this.state.selectedAttributes.push(attribute.property_id) });
    }
    this.setState({
      selectedAttributes: newArr
    });
    console.log(this.state);
  };

  render() {
    var { isLoaded, sidebarData } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
          {Object.keys(this.state.sidebarData).map((collection, i) => {
            return (
              <div>
                {/* this next label needs to have a dynamic change when attribute is selected*/}
                <button
                  className="accordion"
                  onClick={() => this.handleClickCollection(collection)}
                >
                  {this.state.sidebarData[collection].name}
                </button>

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
                          <div
                            className="switch float-right"
                            onClick={() =>
                              this.handleClickAttribute(
                                this.state.sidebarData[collection].properties[
                                  attr
                                ]
                              )
                            }
                          >
                            <input type="checkbox" />
                            <span className="slider round" />
                          </div>
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

const mapStateToProps = state => ({
  selectedAttributes: state.selectedAttributeReducer
});

const mapDispatchToProps = dispatch => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftSideBar);
