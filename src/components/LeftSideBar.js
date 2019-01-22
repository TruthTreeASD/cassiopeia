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
            dropdown[i].addEventListener('click', function () {
                this.classNameList.toggle('active');
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
                <div className="sidenav">
                    {allTableKeys.map((answer, i) => {
                        //console.log("Entered");
                        // Return the element. Also pass key
                        if (i % 2 == 0) {
                            return (
                                <div>
                                    <button className="dropdown-btn">
                                        {answer}
                                        <i className="fa fa-caret-down" />
                                    </button>
                                    <div className="dropdown-container">
                                        
                                        <a href="#">
                                            {allTableKeys[i + 1].toStrng}
                                            <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round" />
                                            </label>
                                        </a>
                                        <a href="#">Link 2</a>
                                        <a href="#">Link 3</a>
                                    </div>
                                </div>
                            );
                        }
                    })}

                   
    
        </div>

            </div>
        );
    }
}

export default LeftSideBar;
