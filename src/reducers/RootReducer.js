import { combineReducers } from 'redux';
import AtrributeRangeReducer from './AttributeRangeReducer';
import filterByReducer from './FilterByReducer';

import selectedAttributeReducer from './SelectedAttributeReducer';

import YearSelectorReducer from './YearSelectorReducer';

export default combineReducers({
  filterByReducer,
  AtrributeRangeReducer,

  selectedAttributeReducer,

  YearSelectorReducer
});
