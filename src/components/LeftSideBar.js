import React, { Component } from 'react';
import '../styles/LeftSideBar.css';

import sidebarData from '../../src/testStuff/cities.json';


class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        //   /api/collections?level=state
        this.state = {};
        // Set initial state of each collection to false
        Object.keys(sidebarData).map(key => (this.state[key] = false));
    }

    // Toggle state of each collection on click
    handleClick = collection => {
        console.log("Clicked!!", collection, this.state[collection]);
        this.setState({ [collection]: !this.state[collection] });
    };

    render() {

        return (
            <div>
                {Object.keys(sidebarData).map((collection, i) => {
                    return (
                        <div>
                            <div className="accordion"
                                onClick={() => this.handleClick(collection)}>{collection}</div>
                            <label style={{ display: this.state[collection] ? "block" : "none" }}>
                                {Object.keys(sidebarData[collection]).map((attr, i) => {
                                    return (
                                        <div className="panel">
                                            <p>{attr}
                                                <label className="switch rightSide">
                                                    <input type="checkbox" />
                                                    <span className="slider round" />
                                                </label>
                                            </p>
                                        </div>
                                    );
                                })}
                            </label>
                        </div>
                    );
                })}
            </div>
        );
    }
    
}

export default LeftSideBar;
