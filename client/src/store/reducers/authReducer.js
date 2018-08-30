import { replaceInArray, removeFromArray } from 'utils';
import {
  FETCH_USER,
  LOGOUT,
  UPDATE_BASIC_USER_DATA,
  ADD_USER_INITIATIVE,
  ADD_USER_MODULE,
  UPDATE_USER_MODULE,
  DELETE_USER_MODULE,
} from '../actions/types';

export default (state = null, { type, payload }) => {
  switch (type) {
    case UPDATE_BASIC_USER_DATA: {
      const image = typeof payload.image === 'string' ? payload.image : payload.image.preview;
      return { ...state, ...payload, image };
    }

    case ADD_USER_INITIATIVE:
      console.log(payload);
      return { ...state, initiatives: [...state.initiatives, payload] };

    case ADD_USER_MODULE:
      return { ...state, modules: [...state.modules, payload] };

    case UPDATE_USER_MODULE:
      return { ...state, modules: replaceInArray(state.modules, payload.module, payload.index) };

    case DELETE_USER_MODULE:
      return { ...state, modules: removeFromArray(state.modules, payload) };

    case FETCH_USER:
      return payload || false;

    case LOGOUT:
      return false;

    default:
      return state;
  }
};
