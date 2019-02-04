import { combineReducers } from 'redux';
import AtrributeRangeReducer from './AttributeRangeReducer';
import filterByReducer from './FilterByReducer';

export default combineReducers({
  filterByReducer,
  AtrributeRangeReducer
});
