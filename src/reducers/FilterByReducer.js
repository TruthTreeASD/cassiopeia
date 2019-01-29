export default (state = { dimension: 'State' }, action) => {
  switch (action.type) {
    case 'CHANGE_DIMENSION':
      return {
        ...state,
        dimension: action.value
      };
    default:
      return state;
  }
};
