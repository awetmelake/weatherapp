import { FETCH_CURRENT, ADD_LOCATION, REMOVE_LOCATION } from "../actions/types";

const intialState = {
  locations: [],
  local: {}
};

export default (state = intialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT:
      return {
        ...state,
        local: action.payload
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: action.payload
      };
    case REMOVE_LOCATION:
      return {
        ...state,
        locations: action.payload
      };
    default:
      return state;
  }
};
