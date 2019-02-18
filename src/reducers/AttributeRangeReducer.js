export default (
  state = {
    attributeName: ['Population'],
    populationRange: [-50, 50]
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
