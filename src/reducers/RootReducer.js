import { combineReducers } from 'redux';
import AttributeRangeReducer from './AttributeRangeReducer';
import FilterByReducer from './FilterByReducer';
import SelectedAttributeReducer from './SelectedAttributeReducer';
import YearSelectorReducer from './YearSelectorReducer';
import LocationSearchBoxReducer from './LocationSearchBoxReducer';
import NormalizationReducer from './NormalizationReducer';
import TrendingStoriesReducer from './TrendingStoriesReducer';
import AdminStoriesReducer from './AdminStoriesReducer';
import SideMenuReducer from './SideMenuReducer';

export default combineReducers({
  FilterByReducer,
  AttributeRangeReducer,
  SelectedAttributeReducer,
  YearSelectorReducer,
  LocationSearchBoxReducer,
  NormalizationReducer,
  TrendingStoriesReducer,
  AdminStoriesReducer,
  SideMenuReducer
});
