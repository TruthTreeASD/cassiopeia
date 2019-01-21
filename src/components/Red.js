import React, { Component } from "react";
import './Red.css';
import testTable from "../../src/testStuff/testTable.json";

class Red extends Component {

    render() {
        var allColors = [];

        for (var i in testTable) {
            allColors.push(i, testTable[i]);
            console.log(testTable[i]);

        }

        function get_table(data) {

            let result = ['<table border=1>'];
            
                for (let cell of data) {
                    result.push(`<td>${cell}</td>`);
                }

            result.push('</table>');
            return result.join('\n');
        }

        return (
            <div>
                <p id="redTable"></p>
                <label class="switch">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                </label>
                <script type="text/javascript" language="JavaScript">
                    get_table(allColors);
                    alert("Hi there, and welcome.")
                </script>
            </div>
        );
    }
}

export default Red;