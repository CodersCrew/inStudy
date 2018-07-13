import axios from 'axios';
import { FETCH_USER, LOGOUT, SET_SIZE } from './types';

export const fetchUser = () => async dispatch => {
  const { data } = await axios.get('/api/current_user');
  return dispatch({ type: FETCH_USER, payload: data });
};

export const logout = () => async dispatch => {
  await axios.get('/api/logout');
  return dispatch({ type: LOGOUT });
};

export const setSize = size => ({
  type: SET_SIZE,
  payload: size,
});
