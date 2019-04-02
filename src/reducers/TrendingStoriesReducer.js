const defaultState = {
  approvedStories: [],
  approvedStoriesLength: 0,
  color: [],
  loading: true,
  userSelectedStory: 'none'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'APPROVED_STORIES_LIST':
      state = {
        ...state,
        approvedStories: action.approvedStories,
        approvedStoriesLength: action.approvedStoriesLength,
        color: action.color,
        userSelectedStory: action.userSelectedStory,
        loading: action.loading
      };
      break;
    case 'USER_SELECTED_STORY':
      state = {
        ...state,
        approvedStories: action.approvedStories,
        approvedStoriesLength: action.approvedStoriesLength,
        color: action.color,
        userSelectedStory: action.userSelectedStory,
        loading: action.loading
      };
      break;
    default:
      return state;
  }

  return state;
};
