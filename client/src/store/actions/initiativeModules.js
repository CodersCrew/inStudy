import axios from 'axios';
import { ADD_INITIATIVE_MODULE, UPDATE_INITIATIVE_MODULE, DELETE_INITIATIVE_MODULE } from './types';

export const addInitiativeModule = (initiativeId, newModule) => async dispatch => {
  const { data: module } = await axios.post(`/api/initiative/${initiativeId}/module`, newModule);
  return dispatch({ type: ADD_INITIATIVE_MODULE, payload: { initiativeId, module } });
};

export const updateInitiativeModule = (updatedModule, initiativeId, moduleId) => async dispatch => {
  const { data: module } = await axios.put(`/api/initiative/${initiativeId}/module/${moduleId}`, updatedModule);
  return dispatch({ type: UPDATE_INITIATIVE_MODULE, payload: { module, initiativeId, moduleId } });
};

export const deleteInitiativeModule = (initiativeId, moduleId) => async dispatch => {
  await axios.delete(`/api/initiative/${initiativeId}/module/${moduleId}`, module);
  return dispatch({ type: DELETE_INITIATIVE_MODULE, payload: { initiativeId, moduleId } });
};

export const sendContactMail = (initiativeId, mailContent) => async dispatch => {
  const response = await axios.post(`/api/initiative/${initiativeId}/send-message`, mailContent);
  console.log('sending email: ', response)
  return dispatch({
    type: 'NON',
  });
}
