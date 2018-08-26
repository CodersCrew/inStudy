import { FETCH_USER, LOGOUT, UPDATE_BASIC_USER_DATA } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case UPDATE_BASIC_USER_DATA: {
      const image =
        typeof action.payload.image === 'string'
          ? action.payload.image
          : action.payload.image.preview;
      return { ...state, ...action.payload, image };
    }

    case FETCH_USER:
      return action.payload || false;

    case LOGOUT:
      return false;

    default:
      return state;
  }
};
