import { replaceInArray, removeFromArray } from 'utils';
import {
  FETCH_USER,
  LOGOUT,
  UPDATE_BASIC_USER_DATA,
  ADD_USER_INITIATIVE,
  ADD_USER_MODULE,
  UPDATE_USER_MODULE,
  DELETE_USER_MODULE,
  REORDER_USER_MODULES,
  ADD_INITIATIVE_MODULE,
  UPDATE_INITIATIVE_MODULE,
  DELETE_INITIATIVE_MODULE,
  REORDER_INITIATIVE_MODULES,
  UPDATE_BASIC_INITIATIVE_DATA,
} from '../actions/types';

const getInitiative = (state, payload) => {
  let initiativeIndex;
  const initiative = state.initiatives.find(({ _id }, index) => {
    if (_id === payload.initiativeId) {
      initiativeIndex = index;
      return true;
    }

    return false;
  });

  return [initiative, initiativeIndex];
};

export default (state = null, { type, payload }) => {
  switch (type) {
    case UPDATE_BASIC_USER_DATA: {
      const image = typeof payload.image === 'string' ? payload.image : payload.image.preview;
      return { ...state, ...payload, image };
    }

    case ADD_USER_INITIATIVE:
      return { ...state, initiatives: [...state.initiatives, payload] };

    case ADD_USER_MODULE:
      return { ...state, modules: [...state.modules, payload] };

    case UPDATE_USER_MODULE:
      return { ...state, modules: replaceInArray(state.modules, payload.module, payload.index) };

    case DELETE_USER_MODULE:
      return { ...state, modules: removeFromArray(state.modules, payload) };

    case REORDER_USER_MODULES:
      return { ...state, modules: payload };

    case ADD_INITIATIVE_MODULE: {
      const [initiative, initiativeIndex] = getInitiative(state, payload);
      const updatedInitiative = { ...initiative, modules: [...initiative.modules, payload.module] };

      return { ...state, initiatives: replaceInArray(state.initiatives, updatedInitiative, initiativeIndex) };
    }

    case UPDATE_INITIATIVE_MODULE: {
      const [initiative, initiativeIndex] = getInitiative(state, payload);
      const updatedInitiative = {
        ...initiative,
        modules: initiative.modules.map(module => (module._id === payload.moduleId ? payload.module : module)),
      };

      return { ...state, initiatives: replaceInArray(state.initiatives, updatedInitiative, initiativeIndex) };
    }

    case DELETE_INITIATIVE_MODULE: {
      const [initiative, initiativeIndex] = getInitiative(state, payload);
      const updatedInitiative = {
        ...initiative,
        modules: initiative.modules.filter(({ _id }) => _id !== payload.moduleId),
      };

      return { ...state, initiatives: replaceInArray(state.initiatives, updatedInitiative, initiativeIndex) };
    }

    case REORDER_INITIATIVE_MODULES: {
      const [initiative, initiativeIndex] = getInitiative(state, payload);
      const updatedInitiative = {
        ...initiative,
        modules: payload.modules,
      };

      return { ...state, initiatives: replaceInArray(state.initiatives, updatedInitiative, initiativeIndex) };
    }

    case UPDATE_BASIC_INITIATIVE_DATA: {
      const { initiativeData, id } = payload;
      const image = typeof initiativeData.image === 'string' ? initiativeData.image : initiativeData.image.preview;
      const initiative = state.initiatives.find(({ _id }) => _id === id);
      const updatedInitiative = { ...initiative, ...initiativeData, image };

      return { ...state, initiatives: state.initiatives.map(ini => ini._id === id ? updatedInitiative : ini) };
    }

    case FETCH_USER:
      return payload || false;

    case LOGOUT:
      return false;

    default:
      return state;
  }
};
