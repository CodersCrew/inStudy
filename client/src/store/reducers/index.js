import { combineReducers } from 'redux';
import { searchReducer } from 'CC-UI/lib/services/search';
import { formsReducer } from 'CC-UI/lib/services/forms';
import authReducer from './authReducer';
import initiativesReducer from './initiativesReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  initiatives: initiativesReducer,
  ...searchReducer,
  ...formsReducer,
});
