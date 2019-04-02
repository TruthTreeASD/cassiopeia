export default (state = { openStory: 'none' }, action) => {
  switch (action.type) {
    case 'STORY_CLOSED':
      state = {
        ...state,
        openStory: false //action.openStory
      };
      break;
    default:
      return state;
  }
  return state;
};
