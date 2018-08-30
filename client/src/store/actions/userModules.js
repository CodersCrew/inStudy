import axios from 'axios';
import { ADD_USER_MODULE, UPDATE_USER_MODULE, DELETE_USER_MODULE } from './types';

export const addUserModule = module => async dispatch => {
  await axios.post('/api/user/module', module);
  return dispatch({ type: ADD_USER_MODULE, payload: module });
};

export const updateUserModule = (module, index) => async dispatch => {
  await axios.put('/api/user/module', { module, index });
  return dispatch({ type: UPDATE_USER_MODULE, payload: { module, index } });
};

export const deleteUserModule = index => async dispatch => {
  await axios.delete(`/api/user/module/${index}`, module);
  return dispatch({ type: DELETE_USER_MODULE, payload: index });
};