export const filterByAction = value => dispatch => {
  dispatch({
    type: 'CHANGE_ATTRIBUTE',
    payload: value
  });
};
