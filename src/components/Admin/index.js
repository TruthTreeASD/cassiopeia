import React, { Component } from 'react';
import {
  Container,
  FormGroup,
  Label,
  Alert,
  Button,
  Jumbotron,
  Row,
  Input
} from 'reactstrap';
import axios from 'axios/index';
import { TRUTHTREE_URI } from '../../constants';

import '../../styles/ApproveIndex.css';
import AdminHome from './AdminHome';

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

    axios({
      method: 'post',
      url: `${TRUTHTREE_URI}/api/login`,
      mode: 'cors',
      credentials: 'include',
      headers: { 'Content-Type': 'text/plain' },
      data: this.password.current.value
    })
      .then(function(response) {
        console.log(response);
        console.log('here11111');
        if (response.status === 200) {
          self.setState({ isAuthenticated: true });
        }
      })
      .catch(error => {
        console.log('here222222');
        console.log(error);
      });
  }

  render() {
    return (
      <Container className="stories-page">
        {!this.state.isAuthenticated && (
          <Jumbotron className="float-center">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 ">
              {!this.state.isFirstLoad && !this.state.isAuthenticated && (
                <Alert color="danger">
                  Incorrect Password! Please enter correct password to login
                </Alert>
              )}
              <br />
              {!this.state.isAuthenticated && (
                <div>
                  <h1 className="text-primary">
                    Welcome to TruthTree Admin login!
                  </h1>
                  <Row style={{ paddingLeft: '25px' }}>
                    <Label for="adminPassword" className="mr-sm-2">
                      Please enter admin password for authentication
                    </Label>
                  </Row>
                  <Row style={{ paddingLeft: '25px' }}>
                    <Input
                      innerRef={this.password}
                      type="password"
                      name="password"
                      id="adminPassword"
                      placeholder="password"
                    />
                  </Row>
                  <br />
                  <Row style={{ paddingLeft: '25px' }}>
                    <Button onClick={this.validatePassword}>Submit</Button>
                  </Row>
                </div>
              )}
            </FormGroup>
          </Jumbotron>
        )}
        {this.state.isAuthenticated && <AdminHome />}
      </Container>
    );
  }
}

export default Approve;
