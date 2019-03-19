import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

class TrendingStories extends Component {
  render() {
    return (
      <Card>
        <CardHeader>Trending Stories</CardHeader>

        <CardBody>
          <p>Display list of trending stories</p>
        </CardBody>
      </Card>
    );
  }
}

export default TrendingStories;
