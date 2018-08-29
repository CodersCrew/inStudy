import { FETCH_USER, LOGOUT, UPDATE_BASIC_USER_DATA, ADD_USER_INITIATIVE } from '../actions/types';

export default (state = null, { type, payload }) => {
  switch (type) {
    case UPDATE_BASIC_USER_DATA: {
      const image = typeof payload.image === 'string' ? payload.image : payload.image.preview;
      return { ...state, ...payload, image };
    }

    case ADD_USER_INITIATIVE:
      console.log(payload);
      return { ...state, initiatives: [...state.initiatives, payload] };

    case FETCH_USER:
      return payload || false;

    case LOGOUT:
      return false;

    default:
      return state;
  }
};
