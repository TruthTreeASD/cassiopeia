export default (
  state = {
    sidebarData: [],
    selectedAttributes: []
  },
  action
) => {
  switch (action.type) {
    case 'CHANGE_ATTRIBUTE':
      return {
        ...state,
        sidebarData: action.payload,
        selectedAttributes: action.value
      };
    default:
      return state;
  }
};
