import React, { Component } from "react";
import '../styles/DisplayComponent.css';

class DisplayComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {displayComponent: 'Map'};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(newState) {
        this.setState({ displayComponent: newState });
    }

    render() {
        return (
            <div>
                <button className='DisplayButtons' onClick={() => this.handleClick('Map') }> Map </button>
                <button className='DisplayButtons' onClick={() => this.handleClick('Chart') }> Chart </button>
                <div className='DisplayArea'>{this.state.displayComponent}</div>
            </div>
        )
    }
}

export default DisplayComponent;