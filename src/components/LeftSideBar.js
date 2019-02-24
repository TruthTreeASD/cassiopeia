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
      selectedAttributes: [],
      collapsedLeft: false,
      searchedString: ''
    };
    // Set initial state of each collection to false
    Object.keys(this.state.sidebarData).map(key => (this.state[key] = false));
    Object.keys(this.state.sidebarData).map(key =>
      Object.keys(this.state.sidebarData[key]).map(
        attrKey =>
          (this.state[
            this.state.sidebarData[key].attributes[attrKey]
          ].attribute_id = false)
      )
    );
  } /*
  // each of these will need a diff api
  componentWillReceiveProps(nextProps) {
      let year = nextProps.year;
      axios
          .get(`${TRUTHTREE_URI}/api/collections?locationId=` + //382026003
              this.props.match.params.id+this.props.year)
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
    axios
      .get(
        `${TRUTHTREE_URI}/api/collections?locationId=` + //382026003
          this.props.match.params.id // +&year=2016
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
    this.setState({ [collection]: !this.state[collection] });
  };

  // stores attribute selected
  handleClickAttribute(collection, attribute) {
    this.setState({
      [attribute.attribute_id]: !this.state[attribute.attribute_id]
    });
    console.log(this.state[attribute]);
    let newArr = this.state.selectedAttributes;
    let id = attribute.attribute_id;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i][0] === id) {
        _.remove(newArr, elem => {
          return elem === newArr[i];
        });
        this.setState({
          selectedAttributes: newArr
        });

        this.props.dispatch({
          type: 'CHANGE_ATTRIBUTE',
          value: newArr
        });
        return;
      }
    }
    newArr.push([id, attribute.name]);
    //console.log(this.props);

    this.setState({
      selectedAttributes: newArr
    });
    this.props.dispatch({
      type: 'CHANGE_ATTRIBUTE',
      value: newArr
    });

    //this.setState({ [attribute]: !this.state[attribute] });
  }

  collapseLeftBar() {
    this.setState({ collapsedLeft: !this.state.collapsedLeft });
    this.setState({ searchedString: '' });
  }

  handleChangeSearch = event => {
    this.setState({ searchedString: event.target.value.toLowerCase() });
    if (this.state.searchedString == '') {
    }
  };

  renderSearchTerm = collection => {
    if (
      this.state.searchedString == '' ||
      this.state.sidebarData[collection].name
        .toLowerCase()
        .search(this.state.searchedString) > -1
    ) {
      return true;
    }
    var attr;
    for (attr in this.state.sidebarData[collection].attributes) {
      if (
        this.state.sidebarData[collection].attributes[attr].name
          .toLowerCase()
          .search(this.state.searchedString) > -1
      ) {
        return true;
      }
    }

    return false;
  };

  render() {
    var { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if (this.state.collapsedLeft) {
        return (
          <button
            className="col-md-flex d-md-flex"
            onClick={() => this.collapseLeftBar()}
          >
            {!this.state.collapsedLeft ? 'Hide Left Nav' : 'Show'}
          </button>
        );
      } else {
        return (
          <nav className="scrollLeftBar col-md-2 d-none d-md-block bg-light sidebar">
            <input
              className="leftSearch"
              data-spy="affix"
              data-offset-top="197" //trying to make search box stay top
              id="attribute-search-box"
              onChange={this.handleChangeSearch}
              placeholder="Search for a property"
            />
            <button
              className="float-right"
              onClick={() => this.collapseLeftBar()}
            >
              {!this.state.collapsedLeft ? 'Hide' : 'Show Left Nav'}
            </button>
            <div
              style={{
                display: !this.state.collapsedLeft ? 'block' : 'none'
              }}
            >
              {Object.keys(this.state.sidebarData).map((collection, i) => {
                if (this.renderSearchTerm(collection)) {
                  return (
                    <div key={i}>
                      <button
                        className="accordion"
                        onClick={() => this.handleClickCollection(collection)}
                      >
                        {this.state.sidebarData[collection].name}
                      </button>
                      <div
                        style={{
                          display: this.state[collection] ? 'block' : 'none'
                        }}
                      >
                        {Object.keys(
                          this.state.sidebarData[collection].attributes
                        ).map((attr, i) => {
                          return (
                            <label //{/*BUGS START HERE*/}
                              onClick={() =>
                                this.handleClickAttribute(
                                  collection,
                                  this.state.sidebarData[collection].attributes[
                                    attr
                                  ]
                                )
                              }
                              key={i}
                              className="panel float-right"
                              style={{
                                background: this.state[
                                  this.state.sidebarData[collection].attributes[
                                    attr
                                  ].attribute_id
                                ]
                                  ? 'bisque'
                                  : '#d4f3c7'
                              }}
                            >
                              <div>
                                {/* <input type="checkbox"/>*/}
                                {
                                  this.state.sidebarData[collection].attributes[
                                    attr
                                  ].name
                                }
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      {/*BUGS END HERE*/}
                    </div>
                  );
                }
              })}
            </div>
          </nav>
        );
      }
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
