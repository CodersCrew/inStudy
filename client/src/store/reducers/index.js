import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';
import searchReducer from './searchReducer';
import authReducer from './authReducer';
import initiativesReducer from './initiativesReducer';
import uiReducer from './uiReducer';
import publicProfileReducer from './publicProfileReducer';

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  initiatives: initiativesReducer,
  form: formReducer,
  search: searchReducer,
  notifications: notificationsReducer(),
  publicProfile: publicProfileReducer,
});
