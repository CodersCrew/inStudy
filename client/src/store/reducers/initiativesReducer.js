import { FETCH_INITIATIVES, FETCH_MORE_INITIATIVES } from '../actions/types';

const initialState = {
  page: false,
  query: '',
  items: [],
  fetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INITIATIVES:
      return { ...state, ...action.payload };

    case FETCH_MORE_INITIATIVES:
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
        page: action.payload.page,
      };

    default:
      return state;
  }
};
