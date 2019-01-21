import React, { Component } from "react";
import './Red.css';
//import testTable from "../../public/testTable";

class Red extends Component {

    render() {
        var testTable = {
            "colors": {
                "red": [3, 4, 5],
                "blue": [30, 40, 50],
                "orange": [-3, -4, -5]
            }
        };
        var jjj = testTable[0]

        function checkedBox() {
            var checkBox = document.getElementById("myCheck");
            var text = document.getElementById("text");
            if (checkBox.checked == true) {
                text.style.display = "block";
            } else {
                text.style.display = "none";
            }
        }



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