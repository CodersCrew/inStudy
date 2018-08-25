import { SET_SEARCH } from '../actions/types';

export default (state = { query: '' }, action) => {
  if (action.type === SET_SEARCH) {
    const { toChange, anyChanges } = Object.keys(action.payload).reduce(
      (a, key) => {
        if (action.payload[key] !== state[key]) {
          a.toChange[key] = action.payload[key];
          a.anyChanges = true;
        }
        return a;
      },
      { toChange: {}, anyChanges: false },
    );

    return anyChanges ? { ...state, ...toChange } : state;
  }

  return state;
};
