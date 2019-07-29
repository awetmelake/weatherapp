import { FETCH_CURRENT, FETCH_WEEKLY } from "../actions/types";

const intialState = {
  current: {},
  weekly: {}
};

export default (state = intialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case FETCH_WEEKLY:
      return {
        ...state,
        weekly: action.payload
      };
    default:
      return state;
  }
};
