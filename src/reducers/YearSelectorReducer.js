export default (state = { yearSelected: 2019 }, action) => {
  switch (action.type) {
    case 'CHANGE_YEAR':
      state = {
        ...state,
        yearSelected: action.yearSelected
      };
      break;
    default:
      return state;
  }
  return state;
};
