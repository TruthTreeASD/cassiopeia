import React, { Component } from "react";
import './Red.css';
import testTable from "../../src/testStuff/testTable.json";

class Red extends Component {

    render() {
        
        var jjj = testTable[0]

        return (
            <div>
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                </label>
            </div>
        );
    }
}

export default Red;