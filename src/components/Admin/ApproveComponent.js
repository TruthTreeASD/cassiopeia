import React, { Component } from 'react';
import StoriesList from '../Stories/TrendingStories';
import ViewAndApproveStory from '../Stories/ViewStories';
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
              <StoriesList admin={true} />
            </Col>
            <Col className="border-right">
              <ViewAndApproveStory admin={true} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default ApproveComponent;
