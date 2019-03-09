export default (
  state = {
    selectedNormalizationDisplayName: 'Gross',
    selectedNormalizationName: 'GROSS'
  },
  action
) => {
  switch (action.type) {
    case 'CHANGE_NORMALIZATION':
      state = {
        ...state,
        selectedNormalizationName: action.selectedNormalizationName,
        selectedNormalizationDisplayName:
          action.selectedNormalizationDisplayName
      };
      break;
    default:
      return state;
  }
  return state;
};
