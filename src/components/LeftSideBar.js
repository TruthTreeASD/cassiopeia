import React, { Component } from 'react';
import '../styles/LeftSideBar.css';

import citiesData from '../../src/testStuff/cities.json';
import statesData from '../../src/testStuff/states.json';
import countiesData from '../../src/testStuff/counties.json';
import { connect } from 'react-redux';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    //   /api/collections?level=state
    this.state = { sidebarData: statesData };
    // Set initial state of each collection to false
    Object.keys(this.state.sidebarData).map(key => (this.state[key] = false));
  }
  /*
    componentDidMount() {
        fetch('https://truthtree.herokuapp.com/api/states')
            .then(res => res.json())
            .then(json => {
                this.setState{sidebarData:statesData}
            })
    }*/

  componentWillReceiveProps(nextProps) {
    if (nextProps.dimension === 'State') {
      this.setState({ sidebarData: statesData });
    } else if (nextProps.dimension === 'City') {
      this.setState({ sidebarData: citiesData });
    } else this.setState({ sidebarData: countiesData });
  }

  // Toggle state of each collection on click
  handleClick = collection => {
    console.log('Clicked!!', collection, this.state[collection]);
    this.setState({ [collection]: !this.state[collection] });
  };

  render() {
    return (
      <div>
        {Object.keys(this.state.sidebarData).map((collection, i) => {
          return (
            <div>
              <div
                className="accordion"
                onClick={() => this.handleClick(collection)}
              >
                {collection}
              </div>
              <div
                style={{ display: this.state[collection] ? 'block' : 'none' }}
              >
                {Object.keys(this.state.sidebarData[collection]).map(
                  (attr, i) => {
                    return (
                      <label className="panel">
                        <p>
                          {attr}
                          <label className="switch rightSide">
                            <input type="checkbox" />
                            <span className="slider round" />
                          </label>
                        </p>
                      </label>
                    );
                  }
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(LeftSideBar);
