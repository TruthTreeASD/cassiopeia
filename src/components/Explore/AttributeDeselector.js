import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Col, Row } from 'reactstrap';

import '../../styles/AttributeDeselector.css';

class AttributeDeselector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttributes: []
    };
  }

  componentDidMount() {
    this.setState({ selectedAttribtes: this.props.selectedAttributes });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ selectedAttributes: nextProps.selectedAttributes });
  }

  deselectAttribute(attribute) {
    let newArr = this.state.selectedAttributes;
    let id = attribute[0];
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
      return (
        <Row>
          <Col xs="auto" className="filters">
            Selected Attributes: None
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col xs="auto" className="filters">
            Selected Attributes:
          </Col>
          <Col>
            {Object.keys(this.state.selectedAttributes).map((attributes, i) => {
              return (
                <button
                  className="btn btn-light selected-attribute-button"
                  onClick={() =>
                    this.deselectAttribute(this.state.selectedAttributes[i])
                  }
                >
                  <i className="fa fa-times" style={{ paddingRight: '10px' }} />
                  {this.state.selectedAttributes[i][2]} -{' '}
                  {this.state.selectedAttributes[i][1]}
                </button>
              );
            })}
          </Col>
        </Row>
      );
    }
  }
}

const mapState = state => ({
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes
});

export default connect(mapState)(AttributeDeselector);
