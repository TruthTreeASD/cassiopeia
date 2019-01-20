import React, { Component } from "react";
import '../styles/DisplayComponent.css';

class DisplayComponent extends Component {
    render() {
        return (
            <div>
                <button className='DisplayButtons'>Map</button>
                <button className='DisplayButtons'>Chart</button>
                <div className='DisplayArea'></div>
            </div>
        )
    }
}

export default DisplayComponent;