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
      state = {
        ...state,
        populationRange: action.populationRange
      };

      break;
  }
  return state;
};
