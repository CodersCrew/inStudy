import axios from 'axios';
import {
  ADD_USER_MODULE,
  UPDATE_USER_MODULE,
  DELETE_USER_MODULE,
  REORDER_USER_MODULES,
} from './types';

export const addUserModule = module => async (dispatch) => {
  await axios.post('/api/user/module', module);
  return dispatch({ type: ADD_USER_MODULE, payload: module });
};

export const updateUserModule = (module, index) => async (dispatch) => {
  await axios.put('/api/user/module', { module, index });
  return dispatch({ type: UPDATE_USER_MODULE, payload: { module, index } });
};

export const deleteUserModule = index => async (dispatch) => {
  await axios.delete(`/api/user/module/${index}`, module);
  return dispatch({ type: DELETE_USER_MODULE, payload: index });
};

export const sendContactMail = (userId, mailContent) => async dispatch => {
  const response = await axios.post(`/api/user/${userId}/send-message`, mailContent);
  console.log('sending email: ', response)
  return dispatch({
    type: 'NON',
  });
}

export const reorderUserModules = modules => async (dispatch) => {
  dispatch({ type: REORDER_USER_MODULES, payload: modules });
  await axios.post('/api/user/module/reorder', modules);
  return modules;
};
