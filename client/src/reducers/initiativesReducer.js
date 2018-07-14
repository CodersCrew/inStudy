import { FETCH_INITIATIVES } from '../actions/types';

const initialState = {
  page: false,
  query: '',
  items: [],
  fetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INITIATIVES:
      return { ...state, fetching: false, items: action.payload };

    default:
      return state;
  }
};
