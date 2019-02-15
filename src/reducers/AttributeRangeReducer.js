export default (
  state = {
    attributeName: ['Population'],
    populationRange: [-50, 50]
  },
  action
) => {
  switch (action.type) {
    case 'RANGE_SELECTION':
      state = {
        ...state,
        populationRange: action.populationRange
      };

      break;
    default:
      return state;
  }
  return state;
};
