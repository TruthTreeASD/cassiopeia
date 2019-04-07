export const updateValue = value => {
  return {
    type: 'SEARCHBOX_UPDATE_VALUE',
    payload: value
  };
};

export const updateSuggestions = suggestions => {
  return {
    type: 'SEARCHBOX_UPDATE_SUGGESTIONS',
    payload: suggestions
  };
};

export const selectSuggestion = suggestion => {
  return {
    type: 'SEARCHBOX_SELECT_SUGGESTION',
    payload: suggestion
  };
};

export const finishLoading = () => {
  return {
    type: 'SEARCHBOX_FINISH_LOADING'
  };
};
