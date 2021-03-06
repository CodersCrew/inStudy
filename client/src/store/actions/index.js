import axios from 'axios';
import { notify } from 'reapop';
import Raven from 'raven-js';
import { push } from 'connected-react-router';
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
  UPDATE_BASIC_INITIATIVE_DATA,
  INCREMENT_MODALS_COUNT,
  DECREMENT_MODALS_COUNT,
} from './types';

export const fetchUser = () => async (dispatch) => {
  const { data } = await axios.get('/api/current_user');

  if (data) {
    Raven.setUserContext(data);
  }

  return dispatch({ type: FETCH_USER, payload: data });
};

export const logout = () => async (dispatch) => {
  await axios.get('/api/logout');

  const message = 'Wylogowałeś się z konta na portalu.';
  dispatch(push('/'));
  dispatch(notify({ title: 'Zostałeś wylogowany', message, status: 'success' }));

  Raven.setUserContext();

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

export const incrementModalsCount = () => ({
  type: INCREMENT_MODALS_COUNT,
});

export const decrementModalsCount = () => ({
  type: DECREMENT_MODALS_COUNT,
});

export const getInitiatives = req => async (dispatch) => {
  const params = {
    page: req?.page || 0,
    query: req?.query || '',
  };

  const { data } = await axios.get('/api/initiative', { params });
  return dispatch({ type: FETCH_INITIATIVES, payload: { ...params, items: data } });
};

export const getMoreInitiatives = req => async (dispatch) => {
  const params = { page: req?.page || 0, query: req?.query || '', };
  const { data } = await axios.get('/api/initiative', { params });
  return dispatch({ type: FETCH_MORE_INITIATIVES, payload: { ...params, items: data } });
};

export const setSearch = (searchObj, history) => ({
  type: SET_SEARCH,
  payload: searchObj,
  history,
});

export const updateBasicUserData = userData => async (dispatch) => {
  await axios.put('/api/user/basic', userData);
  return dispatch({
    type: UPDATE_BASIC_USER_DATA,
    payload: userData,
  });
};

export const updateBasicInitiativeData = (initiativeData, id) => async (dispatch) => {
  await axios.put('/api/initiative/basic', initiativeData);
  return dispatch({
    type: UPDATE_BASIC_INITIATIVE_DATA,
    payload: { initiativeData, id },
  });
};

export const addUserInitiative = initiativeData => async (dispatch) => {
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
