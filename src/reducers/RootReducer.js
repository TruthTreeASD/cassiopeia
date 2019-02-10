import { combineReducers } from 'redux';
import AtrributeRangeReducer from './AttributeRangeReducer';
import filterByReducer from './FilterByReducer';
import selectedAttributeReducer from './SelectedAttributeReducer';

export default combineReducers({
  filterByReducer,
  AtrributeRangeReducer,
  selectedAttributeReducer
});
