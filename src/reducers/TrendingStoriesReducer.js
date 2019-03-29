export default (state = { storyDetails: 'none' }, action) => {
  switch (action.type) {
    case 'SELECTED_STORY':
      state = {
        ...state,
        storyDetails: action.storyDetails
      };
      break;
    default:
      return state;
  }
  return state;
};
