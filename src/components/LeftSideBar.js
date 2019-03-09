import React, { Component } from 'react';
import '../styles/LeftSideBar.css';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import { TRUTHTREE_URI } from '../constants';
import { withRouter } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
  }

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

  componentWillReceiveProps(nextProps) {
    // if (this.state.selectedAttributes != nextProps.selectedAttributes) {
    // this.setState({ selectedAttributes: nextProps.selectedAttributes });
    //  }
    //console.log('got prop');
  }

  isAttributeSelected = attribute_id => {
    for (let i = 0; i < this.props.selectedAttributes.length; i++) {
      if (this.props.selectedAttributes[i][0] === attribute_id) {
        return true;
      }
    }
    return false;
  };

  // Toggle state of each collection on click
  handleClickCollection = collection => {
    this.setState({ [collection]: !this.state[collection] });
  };

  // stores attribute selected
  handleClickAttribute(collection, attribute) {
    let newArr = this.props.selectedAttributes;
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

    // To limit number of selected attributes to 10
    if (newArr.length < 10) {
      newArr.push([id, attribute.name, collection]);
      this.setState({
        selectedAttributes: newArr
      });
      this.props.dispatch({
        type: 'CHANGE_ATTRIBUTE',
        value: newArr
      });
    } else {
      confirmAlert({
        title: 'Error!',
        message:
          'Number of selected attributes exceeded limit of 10, please remove attributes to add more.',
        buttons: [
          {
            label: 'OK'
          }
        ]
      });
    }
  }

  collapseLeftBar() {
    this.setState({ collapsedLeft: !this.state.collapsedLeft });
    this.setState({ searchedString: '' });
  }

  //updates search bar with text
  handleChangeSearch = event => {
    this.setState({ searchedString: event.target.value.toLowerCase() });
    if (this.state.searchedString === '') {
    }
  };

  renderSearchTerm = collection => {
    if (
      this.state.searchedString === '' ||
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
          <button className={'btn'} onClick={() => this.collapseLeftBar()}>
            <i
              className={
                'col-md-flex d-md-flex ' + !this.state.collapsedLeft
                  ? 'fa fa-chevron-right'
                  : 'fa fa-chevron-left'
              }
            />
          </button>
        );
      } else {
        return (
          <nav className="scrollLeftBar col-md-2 d-none d-md-block bg-light sidebar">
            <div className="row">
              <div className="col-10">
                <input
                  className="form-control leftSearch"
                  data-spy="affix"
                  data-offset-top="197" //trying to make search box stay top
                  id="attribute-search-box"
                  onChange={this.handleChangeSearch}
                  placeholder="Property Lookup"
                />
              </div>
              <button className={'btn'} onClick={() => this.collapseLeftBar()}>
                <i
                  className={
                    'chevron-icon-padding ' + !this.state.collapsedLeft
                      ? 'fa fa-chevron-left'
                      : 'fa fa-chevron-right'
                  }
                />
              </button>
            </div>
            <div
              style={{ display: !this.state.collapsedLeft ? 'block' : 'none' }}
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
                            <label
                              onClick={() =>
                                this.handleClickAttribute(
                                  this.state.sidebarData[collection].name,
                                  this.state.sidebarData[collection].attributes[
                                    attr
                                  ]
                                )
                              }
                              key={i}
                              className="panel float-right"
                              style={{
                                background: this.isAttributeSelected(
                                  this.state.sidebarData[collection].attributes[
                                    attr
                                  ].attribute_id
                                )
                                  ? '#d4f3c7'
                                  : 'white'
                              }}
                            >
                              <div>
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
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LeftSideBar));
