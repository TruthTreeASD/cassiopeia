export const filterByAction = value => dispatch => {
  dispatch({
    type: 'UPDATE_ATTRIBUTES',
    payload: value
  });
};
