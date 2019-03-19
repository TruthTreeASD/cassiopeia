import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

class ViewStories extends Component {
  render() {
    return (
      <Card>
        <CardHeader>TruthTree Stories</CardHeader>

        <CardBody>
          <p>Display list of stories</p>
        </CardBody>
      </Card>
    );
  }
}

export default ViewStories;
