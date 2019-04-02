import { combineReducers } from 'redux';
import AttributeRangeReducer from './AttributeRangeReducer';
import FilterByReducer from './FilterByReducer';
import SelectedAttributeReducer from './SelectedAttributeReducer';
import YearSelectorReducer from './YearSelectorReducer';
import LocationSearchBoxReducer from './LocationSearchBoxReducer';
import NormalizationReducer from './NormalizationReducer';
import TrendingStoriesReducer from './TrendingStoriesReducer';
import CommonAttributesReducer from './CommonAttributesReducer';

export default combineReducers({
  FilterByReducer,
  AttributeRangeReducer,
  SelectedAttributeReducer,
  YearSelectorReducer,
  LocationSearchBoxReducer,
  NormalizationReducer,
  TrendingStoriesReducer,
  CommonAttributesReducer
});
