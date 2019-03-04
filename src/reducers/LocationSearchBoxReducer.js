export default (state = { value: '' }, action) => {
  switch (action.type) {
    case 'SEARCHBOX_UPDATE_VALUE':
      return {
        ...state,
        value: action.payload
      };
    default:
      return state;
  }
};
