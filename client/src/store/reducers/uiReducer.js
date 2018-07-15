import { SET_SIZE, SET_HISTORY } from '../actions/types';
import { getViewportSize } from '../../utils';

export default (state = { size: getViewportSize() }, action) => {
  switch (action.type) {
    case SET_SIZE:
      return { ...state, size: action.payload };

    case SET_HISTORY:
      return { ...state, history: action.payload };

    default:
      return state;
  }
};
