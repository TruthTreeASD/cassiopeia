export default (
  state = {
    attributeName: ['Population'],
    populationRange: [-5, 5]
  },
  action
) => {
  switch (action.type) {
    case 'RANGE_SELECTION':
      state = {
        ...state,
        populationRange: action.populationRange
      };
      console.log(this.populationRange);
      break;
  }
  return state;
};
