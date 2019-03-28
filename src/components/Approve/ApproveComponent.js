import React, { Component } from 'react';
import Stories from '../Stories';

class ApproveComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="approveContainer">
        <h3>List of stories to approve</h3>
        <Stories admin={true} />
      </div>
    );
  }
}

export default ApproveComponent;
