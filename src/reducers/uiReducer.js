import { LOADING_INIT, LOADING_COMPLETE } from "../actions/types";

const intialState = {
  loading: false
};

export default (state = intialState, action) => {
  switch (action.type) {
    case LOADING_INIT:
      return {
        ...state,
          loading: true
      };
    case LOADING_COMPLETE:
      return {
        ...state,
          loading: false
      };
    default:
      return state;
  }
};
