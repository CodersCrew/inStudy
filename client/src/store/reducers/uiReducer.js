import { SET_SIZE, SET_HISTORY, INCREMENT_MODALS_COUNT, DECREMENT_MODALS_COUNT } from '../actions/types';
import { getViewportSize } from '../../utils';

export default (state = { size: getViewportSize(), openedModals: 0 }, action) => {
  switch (action.type) {
    case SET_SIZE:
      return { ...state, size: action.payload };

    case SET_HISTORY:
      return { ...state, history: action.payload };

    case INCREMENT_MODALS_COUNT:
      return { ...state, openedModals: state.openedModals + 1 };

    case DECREMENT_MODALS_COUNT:
      return { ...state, openedModals: state.openedModals - 1 };

    default:
      return state;
  }
};
