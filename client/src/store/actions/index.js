import axios from 'axios';
import { FETCH_USER, LOGOUT, SET_SIZE, FETCH_INITIATIVES, SET_HISTORY } from './types';

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

export const setHistory = history => ({
  type: SET_HISTORY,
  payload: history,
});

let reqCache = {};

export const getInitiatives = req => async dispatch => {
  const params = {
    page: req?.page || 0,
    query: req?.query || '',
  };

  if (params.page !== reqCache.page || params.query !== reqCache.query) {
    reqCache = params;
    const { data } = await axios.get('/api/initiative', { params });
    return dispatch({ type: FETCH_INITIATIVES, payload: { ...params, items: data.result } });
  }
};
