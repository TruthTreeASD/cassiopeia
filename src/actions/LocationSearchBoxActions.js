export const updateValue = value => {
  return {
    type: 'SEARCHBOX_UPDATE_VALUE',
    payload: value
  };
};

export const finishLoading = () => {
  return {
    type: 'SEARCHBOX_FINISH_LOADING'
  };
};
