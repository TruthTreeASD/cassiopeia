import React, { Component } from 'react';
import { Spinner, Popover, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { get } from 'axios';
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';

import { TRUTHTREE_URI } from '../../constants';

// TruthTree API endpoints
const ENDPOINTS = {
  STATES: `${TRUTHTREE_URI}/api/states`,
  COUNTIES: `${TRUTHTREE_URI}/api/counties`,
  CITIES: `${TRUTHTREE_URI}/api/cities`
};

const createFuseOptions = keys => {
  return {
    threshold: 0.6,
    includeScore: true,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: keys
  };
};

const PopoverSection = ({ level, items }) => {
  return (
    <ListGroup>
      <ListGroupItem>
        <strong className="text-uppercase">{level}</strong>
      </ListGroupItem>
      {items.map((item, index) => {
        item = item.item;
        let buttonText = item.name;
        if (level !== 'counties') {
          buttonText += item.county ? `, ${item.county}` : '';
        }
        buttonText += item.stateAbbr ? `, ${item.stateAbbr}` : '';
        const url = `/explore/${level}/${item.name
          .toLowerCase()
          .replace(' ', '-')}/${item.id}`;

        return (
          <ListGroupItem key={index}>
            <Link to={url}>{buttonText}</Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

class LocationSearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      popoverOpen: false,
      statesData: undefined,
      countiesData: undefined,
      citiesData: undefined,
      matchedStates: [],
      matchedCounties: [],
      matchedCities: []
    };
  }

  componentDidMount() {
    const reqs = [
      get(ENDPOINTS.STATES),
      get(ENDPOINTS.COUNTIES),
      get(ENDPOINTS.CITIES)
    ];

    Promise.all(reqs)
      .then(([statesRes, countiesRes, citiesRes]) => {
        this._parseData(statesRes.data, countiesRes.data, citiesRes.data);
      })
      .catch(err => console.log(err));
  }

  _parseData = (statesData, countiesData, citiesData) => {
    const statesDataById = statesData.reduce((newStatesData, state) => {
      newStatesData[state.state_code] = state;
      state.counties = {};
      return newStatesData;
    }, {});

    countiesData.forEach(county => {
      const state = statesDataById[county.state_code];
      county.state = state.name;
      county.stateAbbr = state.abbreviation;
      state.counties[county.county] = county;
    });

    citiesData.forEach(city => {
      const state = statesDataById[city.state_code];
      const county = state.counties[city.county];

      if (state) {
        city.state = state.name;
        city.stateAbbr = state.abbreviation;
      } else {
        city.state = null;
        city.stateAbbr = null;
      }
      city.county = county ? county.name : null;
    });

    const statesFuseOptions = createFuseOptions([
      { name: 'abbreviation', weight: 0.3 },
      { name: 'name', weight: 0.7 }
    ]);

    const countiesFuseOptions = createFuseOptions([
      { name: 'name', weight: 0.6 },
      { name: 'state', weight: 0.3 },
      { name: 'stateAbbr', weight: 0.1 }
    ]);

    const citiesFuseOptions = createFuseOptions([
      { name: 'name', weight: 0.7 },
      { name: 'state', weight: 0.2 },
      { name: 'stateAbbr', weight: 0.05 },
      { name: 'county', weight: 0.05 }
    ]);

    this.setState({
      loading: false,
      statesData: new Fuse(statesData, statesFuseOptions),
      countiesData: new Fuse(countiesData, countiesFuseOptions),
      citiesData: new Fuse(citiesData, citiesFuseOptions)
    });
  };

  handleChange = event => {
    const matchedStates = this.state.statesData.search(event.target.value);
    const matchedCounties = this.state.countiesData.search(event.target.value);
    const matchedCities = this.state.citiesData.search(event.target.value);
    const popoverOpen = this.shouldPopoverOpen(
      matchedStates,
      matchedCounties,
      matchedCities
    );
    this.setState({
      matchedStates,
      matchedCounties,
      matchedCities,
      popoverOpen
    });
  };

  handleFocus = () => {
    this.setState({
      popoverOpen: this.shouldPopoverOpen(
        this.state.matchedStates,
        this.state.matchedCounties,
        this.state.matchedCities
      )
    });
  };

  handleBlur = () => {
    this.setState({
      popoverOpen: this.shouldPopoverOpen(
        this.state.matchedStates,
        this.state.matchedCounties,
        this.state.matchedCities
      )
    });
  };

  shouldPopoverOpen = (matchedStates, matchedCounties, matchedCities) => {
    return (
      matchedStates.length > 0 ||
      matchedCounties.length > 0 ||
      matchedCities.length > 0
    );
  };

  render() {
    const {
      loading,
      matchedStates,
      matchedCounties,
      matchedCities,
      popoverOpen
    } = this.state;

    return (
      <div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner className="align-self-center" color="primary" />
          </div>
        ) : (
          <div>
            <Input
              id="location-search-box"
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              placeholder="Search for location"
            />
            <Popover
              placement="bottom"
              isOpen={popoverOpen}
              target="location-search-box"
            >
              {matchedStates.length > 0 && (
                <PopoverSection
                  level="states"
                  items={matchedStates.slice(0, 3)}
                />
              )}
              {matchedCounties.length > 0 && (
                <PopoverSection
                  level="counties"
                  items={matchedCounties.slice(0, 3)}
                />
              )}
              {matchedCities.length > 0 && (
                <PopoverSection
                  level="cities"
                  items={matchedCities.slice(0, 3)}
                />
              )}
            </Popover>
          </div>
        )}
      </div>
    );
  }
}

export default LocationSearchBox;
