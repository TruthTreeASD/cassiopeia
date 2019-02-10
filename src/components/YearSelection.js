import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const DropdownMenuStyle = {
  height: '200px',
  overflow: 'auto'
};

class YearSelection extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      dropDownValue: 'Select a Year'
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  changeValue(e) {
    this.setState({ dropDownValue: e.currentTarget.textContent });
  }

  render() {
    let allYears = [];
    for (let i = 1990; i < 2019; i++) {
      allYears.push(i + 1);
    }
    let yearArray = allYears.map(year => (
      <DropdownItem
        id={year}
        onClick={e => this.setState({ dropDownValue: e.target.id })}
      >
        {year}
      </DropdownItem>
    ));

    const style = { width: 200, margin: 50 };
    return (
      <div style={style}>
        <p> Year of Data: </p>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>{this.state.dropDownValue}</DropdownToggle>
          <DropdownMenu style={DropdownMenuStyle} left>
            {yearArray}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default YearSelection;
