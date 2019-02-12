import React, { Component } from 'react';
import '../styles/LeftSideBar.css';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
//import { Grid } from 'react-virtualized';
import { TRUTHTREE_URI } from '../constants';
import { withRouter } from 'react-router-dom';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    //   /api/collections?level=state
    this.state = {
      sidebarData: [],
      isLoaded: false,
      selectedAttributes: []
    };
    // Set initial state of each collection to false
    Object.keys(this.state.sidebarData).map(key => (this.state[key] = false));
  } /*
  // each of these will need a diff api
  componentWillReceiveProps(nextProps) {
    if (nextProps.dimension === 'State') {
      axios
        .get(`${TRUTHTREE_URI}/api/collections?level=state`)
        .then(response => {
          //data contains the variables
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
          this.setState({
            sidebarData: response.data,
            isLoaded: true
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }*/

  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get(
        `${TRUTHTREE_URI}/api/collections?locationId=` + //382026003
          this.props.match.params.id
      )
      .then(response => {
        //data contains the variables
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
    //this is getting called twice
    //if clicking on the slider.
    let newArr = this.state.selectedAttributes;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i][0] == attribute.property_id) {
        _.remove(newArr, elem => {
          return elem === newArr[i];
        });
        this.setState({
          selectedAttributes: newArr
        });
        console.log(this.props);
        this.props.dispatch({
          type: 'CHANGE_ATTRIBUTE',
          value: newArr
        });
        return;
      }
    } /*
      newArr.forEach(function (element) {
          if (element[0] == attribute.property_id) {
              console.log(element)
              _.remove(newArr, elem => {
                  return elem === element;
              });
              return
          }
      });*/
    newArr.push([attribute.property_id, attribute.name]);
    /*
        let newElem = [attribute.property_id, attribute.name]
        if (_.includes(newArr, [attribute.property_id, attribute.name])) {
        _.remove(newArr, elem => {
            return elem === [attribute.property_id, attribute.name];
        });
      } else {
            newArr.push([attribute.property_id, attribute.name]);
        // this.state.selectedAttributes.push(attribute.property_id) });
      }*/
    this.setState({
      selectedAttributes: newArr
    });
    console.log(this.props);
    this.props.dispatch({
      type: 'CHANGE_ATTRIBUTE',
      value: newArr
    });
  };

  render() {
    var { isLoaded, sidebarData } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <nav className="scrollLeftBar col-md-2 d-none d-md-block bg-dark sidebar">
          {Object.keys(this.state.sidebarData).map((collection, i) => {
            return (
              <div key={i}>
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
                      <label key={i} className="panel float-right">
                        <div>
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
                        </div>
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
  selectedAttributes: state.SelectedAttributeReducer
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LeftSideBar));
