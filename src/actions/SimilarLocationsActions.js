export const updateLocations = locations => {
  return {
    type: 'UPDATE_SIMILAR_LOCATIONS',
    locations: locations
  };
};

export const emptySimilarLocations = () => {
  return {
    type: 'UPDATE_SIMILAR_LOCATIONS',
    locations: []
  };
};
