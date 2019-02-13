export default (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_SUGGESTIONS':
      return action.suggestions;

    default:
      return state;
  }
};
