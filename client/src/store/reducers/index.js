import { combineReducers } from 'redux';
import { searchReducer } from 'react-ui-framework/lib/services/search';
import authReducer from './authReducer';
import initiativesReducer from './initiativesReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  initiatives: initiativesReducer,
  ...searchReducer,
});