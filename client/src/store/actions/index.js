import axios from 'axios';
import { notify } from 'reapop';
import {
  FETCH_USER,
  LOGOUT,
  SET_SIZE,
  FETCH_INITIATIVES,
  SET_HISTORY,
  FETCH_MORE_INITIATIVES,
  SET_SEARCH,
  UPDATE_BASIC_USER_DATA,
  ADD_USER_INITIATIVE,
} from './types';

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
    return dispatch({ type: FETCH_INITIATIVES, payload: { ...params, items: data } });
  }
};

export const getMoreInitiatives = () => async dispatch => {
  const params = { ...reqCache, page: reqCache.page + 1 };
  const { data } = await axios.get('/api/initiative', { params });
  return dispatch({ type: FETCH_MORE_INITIATIVES, payload: { ...params, items: data } });
};

export const setSearch = (searchObj, history) => ({
  type: SET_SEARCH,
  payload: searchObj,
  history,
});

export const updateBasicUserData = userData => async dispatch => {
  await axios.put('/api/user/basic', userData);
  return dispatch({
    type: UPDATE_BASIC_USER_DATA,
    payload: userData,
  });
};

export const addUserInitiative = initiativeData => async dispatch => {
  try {
    const data = await axios.post('/api/initiative', initiativeData);

    return dispatch({
      type: ADD_USER_INITIATIVE,
      payload: data.data.result,
    });
  } catch (e) {
    if (e.response.status === 409) {
      const message = 'Inicjatywa o podanej nazwie lub adresie fanpage już istnieje.';
      dispatch(notify({ title: 'Inicjatywa już istnieje', message, status: 409 }));
      throw message;
    } else {
      console.error({ ...e });
    }
  }
};
