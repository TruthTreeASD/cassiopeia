import React, {Component} from 'react'
import "../styles/FilterBy.css"
import City from "../testStuff/cities.json"
import Country from "../testStuff/counties.json"



class FilterBy extends Component{

	 constructor(params) {
     super(params) 
     //initial dimension state set from props
     this.state = {
       dimension: this.props.dimension
     }
     this.setDimension = this.setDimension.bind(this)
  }
  
  setDimension(e) {
    this.setState({
      dimension: e.target.value
    })
  }
 render() {
    const {dimension} = this.state
    return ( 

    	<div className = "FilterBy">	
        	Select the dimension to be filtered by:
        	<div className = "RadioButtons">
        	
          	<input type="radio" checked={dimension == "City"} 
				onClick={this.setDimension} value="City" /> City
			
			&nbsp;
          	<input type="radio" checked={dimension == "County"} 
				onClick={this.setDimension} value="County"  /> County
        	</div>
        { "Selected dimension: " } {dimension}
      </div>
      )
	}
}

export default FilterBy;