import React, { Component } from "react";
//import testTable from "../../public/testTable";

class Red extends Component {

    testTable = {
    "colors": {
        "red": {
            "c1": 3,
            "c2": 4,
            "c3": 5
        },
        "blue": {
            "c1": 30,
            "c2": 40,
            "c3": 50
        },
        "orange": {
            "c1": -3,
            "c2": -4,
            "c3": -5
        }
    }
};
    output = document.getElementById('output');
    //output.innerHTML = testTable.colors[0];

    render() {
    return (
        <div>
            <tr>
                <td></td>
            </tr>
        </div>
    );
    }
}

export default Red;