export default (
  state = {
    attributeName: ['Population'],
    populationRange: [-25, 25]
  },
  action
) => {
  switch (action.type) {
    case 'RANGE_SELECTION':
      return {
        ...state,
        populationRange: action.populationRange
      };
    default:
      return state;
  }
};
