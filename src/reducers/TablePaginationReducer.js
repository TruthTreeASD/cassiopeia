export default (
  state = { curPage: 1, totalPageNumber: 0, pageSize: 50, totalItemsCount: 0 },
  action
) => {
  switch (action.type) {
    case 'TABLE_PAGINATION':
      state = {
        ...state,
        curPage: action.curPage,
        totalPageNumber: action.totalPageNumber,
        pageSize: action.pageSize,
        totalItemsCount: action.totalItemsCount
      };
      break;
    default:
      return state;
  }

  return state;
};
