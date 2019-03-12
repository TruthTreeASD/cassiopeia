import React, { Component } from 'react';
import { Container, Row, Col, Label, Input, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { updateValue } from '../../actions/LocationSearchBoxActions';

class DummySearchBox extends Component {
  handleInputChange = event => {
    event.target.blur();
    this.props.dispatch(updateValue(event.target.value));
  };

  render() {
    const { value, loading } = this.props;
    return (
      <Container>
        <Row className="py-3">
          {loading ? (
            <Col className="d-flex justify-content-center">
              <Spinner className="align-self-center" color="primary" />
            </Col>
          ) : (
            <Col>
              <Label
                style={{ cursor: 'pointer', color: 'white' }}
                for="dummy-search-box"
              >
                Search for a U.S location:
              </Label>
              <Input
                id="dummy-search-box"
                value={value}
                onChange={this.handleInputChange}
                placeholder="Try something like Seattle or Boston"
              />
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = store => ({
  value: store.LocationSearchBoxReducer.value,
  loading: store.LocationSearchBoxReducer.loading
});

export default connect(mapStateToProps)(DummySearchBox);
