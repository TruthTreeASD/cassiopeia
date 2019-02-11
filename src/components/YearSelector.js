import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';

const dropdownMenuStyle = {
  height: '200px',
  overflow: 'auto'
};

const yearSelectorStyle = {
  width: '200px',
  margin: '50px'
};

let allYears = [];
for (let i = 1966; i < 2019; i++) {
  allYears.push(i + 1);
}

class YearSelector extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      yearSelected: '2019'
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    let yearArray = allYears.map(year => (
      <DropdownItem
        id={year}
        onClick={e => this.setState({ yearSelected: e.target.id })}
      >
        {year}
      </DropdownItem>
    ));

    console.log(this.state.yearSelected);

    return (
      <div style={yearSelectorStyle}>
        <p> Year: </p>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>{this.state.yearSelected}</DropdownToggle>
          <DropdownMenu style={dropdownMenuStyle}>{yearArray}</DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    yearSelected: state.YearSelectorReducer.yearSelected
  };
};

export default connect(mapStateToProps)(YearSelector);
