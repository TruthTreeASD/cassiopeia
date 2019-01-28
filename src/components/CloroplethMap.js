import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3 from 'd3';
import UsaJson from '../maps/Usa.topo.json';

class ChoroplethMap extends Component {
  componentDidMount() {
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
      //
      let iso = item[0],
        value = item[1];
      dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
    });

    let map = new Datamap({
      element: document.getElementById('cloropleth_map'),
      scope: 'Usa',
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
          .center([-98.123152, 38.1304])
          .scale(450)
          .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

        var path = d3.geo.path().projection(projection);
        return { path: path, projection: projection };
      }
    });
  }
  render() {
    return (
      <div
        id="cloropleth_map"
        style={{
          height: '100%',
          width: '100%'
        }}
      />
    );
  }
}

export default ChoroplethMap;
