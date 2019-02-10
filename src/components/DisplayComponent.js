import React, { Component } from 'react';
import '../styles/DisplayComponent.css';
import classNames from 'classnames';
import 'react-virtualized/styles.css';
import { defaultCellRangeRenderer, MultiGrid } from 'react-virtualized';
import { connect } from 'react-redux';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.cellRenderer = this.cellRenderer.bind(this);
  }

  // Grid data as an array of arrays

  cellRenderer({ columnIndex, key, rowIndex, style }) {
    let list = [
      [
        'Name',
        'Population',
        'San Jose',
        'CA',
        95125,
        'Brian Vaughn',
        'Software Engineer',
        'San Jose'
      ],
      [
        'Brian Vaughn',
        'Software Engineer',
        'San Jose',
        'CA',
        95125,
        'Brian Vaughn',
        'Software Engineer',
        'San Jose'
      ],
      [
        'Brian Vaughn',
        'Software Engineer',
        'San Jose',
        'CA',
        95125,
        'Brian Vaughn',
        'Software Engineer',
        'San Jose'
      ],
      [
        'Brian Vaughn',
        'Software Engineer',
        'San Jose',
        'CA',
        95125,
        'Brian Vaughn',
        'Software Engineer',
        'San Jose'
      ]
      // And so on...
    ];
    return (
      <div key={key} style={style}>
        {list[rowIndex][columnIndex]}
      </div>
    );
  }

  customizedGrid(props) {
    return (
      <MultiGrid
        cellRenderer={this.cellRenderer}
        columnCount={8}
        columnWidth={150}
        fixedColumnCount={2}
        fixedRowCount={1}
        height={500}
        rowCount={4}
        rowHeight={30}
        width={1100}
      />
    );
  }

  render() {
    return (
      <div className="col-12 col-md-10 align-items-center">
        {this.customizedGrid([1, 2, 3])}
      </div>
    );
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(DisplayComponent);
