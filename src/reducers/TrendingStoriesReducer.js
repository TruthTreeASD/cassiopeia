const defaultState = {
  approvedStories: [],
  approvedStoriesLength: 0,
  color: [],
  loading: true,
  userSelectedStory: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'APPROVED_STORIES_LIST':
      return {
        ...state,
        approvedStories: action.approvedStories,
        approvedStoriesLength: action.approvedStoriesLength,
        color: action.color,
        userSelectedStory: action.userSelectedStory,
        loading: action.loading
      };

    case 'USER_SELECTED_STORY':
      return {
        ...state,
        approvedStories: action.approvedStories,
        approvedStoriesLength: action.approvedStoriesLength,
        color: action.color,
        userSelectedStory: action.userSelectedStory,
        loading: action.loading
      };

    case 'TRENDING_STORIES_CLEAR_SELECTION':
      return {
        ...state,
        userSelectedStory: null
      };
    default:
      return state;
  }

  return state;
};
