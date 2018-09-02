import { GET_USER_PUBLIC_PROFILE, CLEAN_PUBLIC_PROFILE, GET_INITIATIVE_PUBLIC_PROFILE } from '../actions/types';

export default (state = null, { type, payload }) => {
  switch (type) {
    case GET_USER_PUBLIC_PROFILE:
      return payload;

    case GET_INITIATIVE_PUBLIC_PROFILE:
      return payload;

    case CLEAN_PUBLIC_PROFILE:
      return null;

    default:
      return state;
  }
};
