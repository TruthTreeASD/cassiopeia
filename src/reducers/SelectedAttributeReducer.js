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
        selectedAttributes: Array.from(action.value)
      };
    default:
      return state;
  }
};
