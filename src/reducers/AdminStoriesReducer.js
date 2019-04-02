const defaultState = {
  adminStories: [],
  adminStoriesLength: 0,
  bgColor: [],
  loading: true,
  adminSelectedStory: 'none'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'STORIES_LIST':
      state = {
        ...state,
        adminStories: action.adminStories,
        adminStoriesLength: action.adminStoriesLength,
        bgColor: action.bgColor,
        adminSelectedStory: action.adminSelectedStory,
        loading: action.loading
      };

    case 'ADMIN_SELECTED_STORY':
      state = {
        ...state,
        adminStories: action.adminStories,
        adminStoriesLength: action.adminStoriesLength,
        bgColor: action.bgColor,
        adminSelectedStory: action.adminSelectedStory,
        loading: action.loading
      };
      break;
    default:
      return state;
  }
  console.log(action);
  return state;
};
