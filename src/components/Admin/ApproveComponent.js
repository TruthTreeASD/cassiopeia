import React, { Component } from 'react';
import ListOfStories from './ListOfStories';
import ViewAndApproveStory from './ViewAndApproveStory';
import { Container, Card, Row, CardHeader, CardBody, Col } from 'reactstrap';

class ApproveComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <Col>Stories To Be Approved </Col>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className="border-right">
              <ListOfStories />
            </Col>
            <Col className="border-right">
              <ViewAndApproveStory />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default ApproveComponent;
