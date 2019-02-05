import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.usa.min.js';
import '../styles/CloroplethMap.css';
import d3 from 'd3';
import Zoom from 'react-reveal/Zoom';
import UsaJson from '../maps/Usa.topo.json';
import { connect } from 'react-redux';

class ChoroplethMap extends Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    let dataset = {};
    let onlyValues = this.props.data.map(function(obj) {
      return obj[1];
    });
    let minValue = Math.min.apply(null, onlyValues),
      maxValue = Math.max.apply(null, onlyValues);

    let paletteScale = d3.scale
      .linear()
      .domain([minValue, maxValue])
      .range(['#EFEFFF', '#02386F']);

    this.props.data.forEach(function(item) {
      let iso = item[0],
        value = item[1];
      dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
    });

    let map = new Datamap({
      element: document.getElementById('cloropleth_map'),
      scope:
        this.props.dimension === 'State'
          ? 'states'
          : this.props.dimension === 'County'
          ? 'counties'
          : 'land',
      geographyConfig: {
        popupOnHover: true,
        highlightOnHover: true,
        borderColor: '#444',
        highlightBorderWidth: 1,
        borderWidth: 0.5,
        dataJson: UsaJson,
        popupTemplate: function(geo, data) {
          // don't show tooltip if country don't present in dataset
          if (!data) {
            return;
          }
          return [
            '<div class="hoverinfo">',
            '<strong>',
            geo.properties.name,
            '</strong>',
            '<br>Count: <strong>',
            data.numberOfThings,
            '</strong>',
            '</div>'
          ].join('');
        }
      },
      fills: {
        HIGH: '#afafaf',
        LOW: '#123456',
        MEDIUM: 'blue',
        UNKNOWN: 'rgb(0,0,0)',
        defaultFill: '#eee'
      },
      data: dataset,
      setProjection: function(element) {
        var projection = d3.geo
          .mercator()
          .center([-100.123152, 38.1304])
          .scale(500)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

        var path = d3.geo.path().projection(projection);
        return { path: path, projection: projection };
      }
    });
  }
  render() {
    let wrapperStyle = { zoom: this.props.zoom };
    return (
      <Zoom>
        <div
          key={this.props.dimension}
          id="cloropleth_map"
          className="cloropleth-map"
          style={wrapperStyle}
        />
      </Zoom>
    );
  }
}

const mapState = state => ({
  dimension: state.filterByReducer.dimension
});

export default connect(mapState)(ChoroplethMap);
