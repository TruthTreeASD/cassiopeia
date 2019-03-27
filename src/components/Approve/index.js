import React, { Component } from 'react';
import { Container, FormGroup, Label, Alert, Button } from 'reactstrap';
import bcrypt from 'bcryptjs';
import '../../styles/ApproveIndex.css';
import ApproveComponent from './ApproveComponent';

class Approve extends Component {
  constructor(props) {
    super(props);
    this.validatePassword = this.validatePassword.bind(this);
    this.password = React.createRef();
    this.state = {
      isFirstLoad: true,
      isAuthenticated: false
    };
  }

  validatePassword() {
    this.setState({ isFirstLoad: false });
    var self = this;
    bcrypt.compare(
      this.password.current.value,
      '$2a$10$O4SrNipdI3ChGKfxyTTpougsxZ85nTzyDcvhpCzL4hHAFV1UalHy2',
      function(err, result) {
        if (err) {
          throw err;
        }
        if (result) {
          self.setState({ isAuthenticated: true });
        }
      }
    );
  }

  render() {
    return (
      <Container className="stories-page">
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          {!this.state.isFirstLoad && !this.state.isAuthenticated && (
            <Alert color="danger">
              Incorrect Password! Please enter correct admin password to login
            </Alert>
          )}
          <br />
          {!this.state.isAuthenticated && (
            <div>
              <Label for="examplePassword" className="mr-sm-2">
                Please enter your admin Password for authentication
              </Label>
              <input
                ref={this.password}
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password"
              />
              <br />
              <Button onClick={this.validatePassword}>Submit</Button>
            </div>
          )}
          {this.state.isAuthenticated && <ApproveComponent />}
        </FormGroup>
      </Container>
    );
  }
}

export default Approve;
