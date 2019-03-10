const defaultState = {
  value: '',
  loading: true
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SEARCHBOX_UPDATE_VALUE':
      return {
        ...state,
        value: action.payload
      };

    case 'SEARCHBOX_FINISH_LOADING':
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
