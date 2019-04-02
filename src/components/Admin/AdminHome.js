import React, { Component } from 'react';
import StoriesList from './PendingApprovalStories';
import ViewAndApproveStory from './StoryDetails';
import { Card, Row, CardHeader, CardBody, Col } from 'reactstrap';

class AdminHome extends Component {
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

export default AdminHome;
