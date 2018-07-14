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
  const { data } = await axios.get('/api/initiative', {
    params: {
      page: query?.page || 0,
      query: query?.query || 0,
    },
  });
  return dispatch({ type: FETCH_INITIATIVES, payload: data.result });
};
