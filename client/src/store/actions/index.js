import axios from 'axios';
import { FETCH_USER, LOGOUT, SET_SIZE, FETCH_INITIATIVES } from './types';

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

export const getInitiatives = query => async dispatch => {
  console.log('initiatives request started');
  const params = {
    page: query?.page || 0,
    query: query?.query || 0,
  };
  const { data } = await axios.get('/api/initiative', { params });
  console.log('initiatives request resolved');
  return dispatch({ type: FETCH_INITIATIVES, payload: { ...params, items: data.result } });
};
