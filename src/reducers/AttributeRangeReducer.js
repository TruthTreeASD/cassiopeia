export default (
  state = {
    attributeName: ['Population'],
    populationRange: [-50, 50]
  },
  action
) => {
  switch (action.type) {
    case 'RANGE_SELECTION':
      //console.log(action);
      return {
        ...state,
        populationRange: action.populationRange
      };
    default:
      return state;
  }
};
