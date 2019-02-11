export default (
  state = {
    sidebarData: [],
    selectedAttributes: []
  },
  action
) => {
  switch (action.type) {
    case 'addAttribute':
      state = {
        ...state,
        sidebarData: action.payload,
        selectedAttributes: [...state.lastValues, action.payload]
      };
      // state.attributeName = action.payload;
      break;
    default:
      return state;
  }

  return state;
};
