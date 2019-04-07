export default (state = { isOpen: false }, action) => {
  switch (action.type) {
    case 'SIDEMENU_OPEN':
      return {
        isOpen: true
      };

    case 'SIDEMENU_CLOSE':
      return {
        isOpen: false
      };

    case 'SIDEMENU_TOGGLE':
      return {
        isOpen: !state.isOpen
      };

    case 'SIDEMENU_SET_STATE':
      return {
        isOpen: action.payload
      };

    default:
      return state;
  }
};
