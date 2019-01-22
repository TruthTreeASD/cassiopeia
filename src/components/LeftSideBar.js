import React, { Component } from 'react';
import '../styles/LeftSideBar.css';

import testTable from '../../src/testStuff/cities.json';


class LeftSideBar extends Component {
  render() {
    let allTableKeys = [];

    for (var i in testTable) {
      allTableKeys.push(i, testTable[i]);
    }
    console.log(allTableKeys);

    var dropdown = document.getElementsByClassName('dropdown-btn');
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener('click', function() {
        this.classList.toggle('active');
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
        } else {
          dropdownContent.style.display = 'block';
        }
      });
    }

    return (
      <div>
        <div class="sidenav">
          {allTableKeys.map((answer, i) => {
            //console.log("Entered");
            // Return the element. Also pass key
            return (
              <button className="dropdown-btn">
                bat
                <i className="fa fa-caret-down" />
              </button>
            );
          })}
          <button class="dropdown-btn">
            {allTableKeys[0]}
            <i class="fa fa-caret-down" />
          </button>
          <div class="dropdown-container">
            <a href="#">
              {allTableKeys[1][0]}
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round" />
                <br />
                <br />
              </label>
            </a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
          <button class="dropdown-btn">
            {allTableKeys[2]}
            <i class="fa fa-caret-down" />
          </button>
          <div class="dropdown-container">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftSideBar;
