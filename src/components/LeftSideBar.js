import React, { Component } from 'react';
import '../styles/LeftSideBar.css';

import testTable from '../../src/testStuff/cities.json';


class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.expandCollection = this.expandCollection.bind(this);
    }

    expandCollection(answer) {
        console.log("Clicked!!", answer)

        /*this.classList.toggle("active");
        let panel = answer.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
       /* let acc = document.getElementsByClassName("accordion");
        let i;

        for (i = 0; i < acc.length; i++) {
            
                console.log("Clicked!!")
                this.classList.toggle("active");
                let panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
 
        }*/
    }
    render() {

        let allTableKeys = [];
        
        for (let i in testTable) {
            allTableKeys.push(i, testTable[i]);
        }
        for (let i = 0; i < allTableKeys.length; i++) {
            if (i % 2 === 1) {
                let elements = []
                for (let j in allTableKeys[i]) {
                    elements.push(j)//, testTable[i][j]
                }
                allTableKeys[i] = elements;
            }
        }
        console.log(allTableKeys);

        



        return (
            <div>
                
                    {allTableKeys.map((answer, i) => {
                        //console.log("Entered");
                        // Return the element. Also pass key
                        if (i % 2 == 0) {
                            return (
                                <div>
                                    <button class="accordionon" onClick={() => this.expandCollection(answer)}>{answer}</button>
                                    <div class="panel">
                                        
                                            {allTableKeys[i+1].map((elem, i) => {
                                                return (<div>
                                                    <p>{elem}
                                                    <label className="switch">
                                                        <input type="checkbox" />
                                                        <span className="slider round" />
                                                        </label></p>
                                                </div>);
                                            })}
                                        
                                    </div>
                                </div>
                            );
                        }
                    })}

                

            </div>
        );
    }
}

export default LeftSideBar;
