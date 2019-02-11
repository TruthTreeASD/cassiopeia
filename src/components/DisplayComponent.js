import React, { Component } from 'react';
import classNames from 'classnames';
import { defaultCellRangeRenderer, MultiGrid } from 'react-virtualized';
import { connect } from 'react-redux';
import axios from 'axios/index';
import _ from 'lodash';

import styles from 'react-virtualized/styles.css';
import '../styles/DisplayComponent.css';

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.cellRenderer = this.cellRenderer.bind(this);
  }

  cellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style}>
        {this.props.data[rowIndex][columnIndex]}
      </div>
    );
  }

  render() {
    console.log('+++++++');
    console.log(this.props);
    console.log('+++++++');
    return (
      <div id="mainDisplay" className="col-12 col-md-10 align-items-center">
        <MultiGrid
          cellRenderer={this.cellRenderer}
          columnCount={this.props.data[0].length}
          columnWidth={150}
          fixedColumnCount={2}
          fixedRowCount={1}
          height={500}
          rowCount={this.props.data.length}
          rowHeight={30}
          width={1100}
        />
      </div>
    );
  }
}

const mapState = state => ({
  year: state.YearSelectorReducer.yearSelected,
  selectedAttributes: state.SelectedAttributeReducer.selectedAttributes
});

export default connect(mapState)(DisplayComponent);
