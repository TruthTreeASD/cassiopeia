const defaultState = {
  value: '',
  loading: false,
  suggestions: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SEARCHBOX_UPDATE_VALUE':
      return {
        ...state,
        value: action.payload,
        suggestions: action.payload === '' ? [] : state.suggestions
      };

    case 'SEARCHBOX_UPDATE_SUGGESTIONS':
      return {
        ...state,
        suggestions: state.value === '' ? [] : action.payload
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
