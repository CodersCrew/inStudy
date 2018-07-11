import { SET_SIZE } from '../actions/types';
import { getViewportSize } from '../utils';

export default (state = { size: getViewportSize() }, action) => {
  switch (action.type) {
    case SET_SIZE:
      return { ...state, size: action.payload };

    default:
      return state;
  }
};
