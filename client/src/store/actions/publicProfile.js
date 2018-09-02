import axios from 'axios';
import { GET_USER_PUBLIC_PROFILE, CLEAN_PUBLIC_PROFILE } from './types';

export const getUserPublicProfile = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/user/${userId}`);

    return dispatch({
      type: GET_USER_PUBLIC_PROFILE,
      payload: data,
    });
  } catch (e) {
    console.error({ ...e });
    return dispatch({
      type: GET_USER_PUBLIC_PROFILE,
      payload: false,
    });
  }
};

export const cleanPublicProfile = () => ({
  type: CLEAN_PUBLIC_PROFILE,
});
