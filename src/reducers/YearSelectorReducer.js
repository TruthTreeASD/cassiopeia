export default (state = { yearSelected: 2019 }, action) => {
  switch (action.type) {
    case 'CHANGE_YEAR':
      //console.log(action);
      state = {
        ...state,
        yearSelected: action.yearSelected
      };
      break;
  }
  return state;
};
