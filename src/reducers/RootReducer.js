import { combineReducers } from 'redux';
import AtrributeRangeReducer from './AttributeRangeReducer';
import filterByReducer from './FilterByReducer';
import YearSelectorReducer from './YearSelectorReducer';

export default combineReducers({
  filterByReducer,
  AtrributeRangeReducer,
  YearSelectorReducer
});
