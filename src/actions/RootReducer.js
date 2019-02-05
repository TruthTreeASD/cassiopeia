export const rootReducer = value => dispatch => {
  dispatch({
    type: 'CHANGE_DIMENSION',
    payload: value
  });
};
