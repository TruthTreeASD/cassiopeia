export default (
  state = {
    attributeName: ['Population']
  },
  action
) => {
  switch (action.type) {
    case 'addAttribute':
      state = {
        ...state,
        attributeName: action.payload
      };
      state.attributeName = action.payload;
      break;
  }

  return state;
};

/*store.subscribe(() => {
  console.log("Store is updated", store.getState());


});

store.dispatch({
  type: "addAttribute",
  payload: "alcohal_tax"

});

store.dispatch({
  type: "addAttribute",
  payload: "property_tax"

});
*/
