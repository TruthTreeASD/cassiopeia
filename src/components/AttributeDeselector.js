import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';
import { TRUTHTREE_URI } from '../constants';
import SelectedAttributeReducer from '../reducers/SelectedAttributeReducer';

class AttributeDeselector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: []
    };
  }

  componentDidMount() {
    this.setState({ selectedAttribtes: this.props.selectedAttributes });
    console.log(this.state.selectedAttributes);
    console.log('it worked' + this.state.selectedAttributes);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ selectedAttributes: nextProps.selectedAttributes });
    console.log('got prop');
  }

  deselectAttribute(attribute) {
    console.log('Clicked button');
    let newArr = this.state.selectedAttributes;
    let id = attribute[0];
    console.log(attribute);
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
  }

  render() {
    if (this.state.selectedAttributes.length < 1) {
      return <div />;
    } else {
      return (
        <div className={'row'}>
          <span
            className="text-info"
            style={{ padding: '10px', fontSize: '18px' }}
          >
            Selected Filters
          </span>
          {Object.keys(this.state.selectedAttributes).map((attributes, i) => {
            return (
              <div style={{ padding: '10px' }}>
                <button className="btn btn-light">
                  <i
                    className="fa fa-times"
                    style={{ paddingRight: '10px' }}
                    onClick={() =>
                      this.deselectAttribute(this.state.selectedAttributes[i])
                    }
                  />
                  {this.state.selectedAttributes[i][1]}
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

const mapState = state => ({
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes
});

export default connect(mapState)(AttributeDeselector);
