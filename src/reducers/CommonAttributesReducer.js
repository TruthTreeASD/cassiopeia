export default (
  state = {
    selectedAttributes: []
  },
  action
) => {
  switch (action.type) {
    case 'ADD_ATTRIBUTES':
      let newAttributes = state.selectedAttributes;
      newAttributes = action.selectedAttribute;
      state = {
        ...state,
        selectedAttributes: newAttributes
      };
      break;
    case 'EMPTY_ATTRIBUTES_LIST':
      state = {
        selectedAttributes: []
      };
      break;
    default:
      return state;
  }
  return state;
};
