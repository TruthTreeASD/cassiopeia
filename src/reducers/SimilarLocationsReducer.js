const defaultState = {
  locations: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_SIMILAR_LOCATIONS':
      return {
        ...state,
        locations: action.locations
      };

    default:
      return state;
  }
};
