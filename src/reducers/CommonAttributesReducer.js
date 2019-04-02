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
    default:
      return state;
  }
  return state;
};
