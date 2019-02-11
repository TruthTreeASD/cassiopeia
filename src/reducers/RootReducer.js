import { combineReducers } from 'redux';
import AtrributeRangeReducer from './AttributeRangeReducer';
import FilterByReducer from './FilterByReducer';

import SelectedAttributeReducer from './SelectedAttributeReducer';

import YearSelectorReducer from './YearSelectorReducer';

export default combineReducers({
  FilterByReducer,
  AtrributeRangeReducer,

  SelectedAttributeReducer,

  YearSelectorReducer
});
