import React, { Component } from 'react';
import StoriesList from './StoriesForApproval';
import ViewAndApproveStory from './ViewStory';
import { Card, Row, CardHeader, CardBody, Col } from 'reactstrap';

class ApproveComponent extends Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <Col>Stories To Be Approved </Col>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className="border-right">
              <StoriesList />
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
