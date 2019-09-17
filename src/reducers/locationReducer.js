import { FETCHED_USER_LOCATION, FETCHED_USER_ZIP } from "../actions/types";

const intialState = {
  coords: {
    long: "",
    lat: ""
  },
  zipCode: null
};
export default (state = intialState, action) => {
  switch (action.type) {
    case FETCHED_USER_LOCATION:
      return {
        ...state,
        coords: action.payload
      };
    case FETCHED_USER_ZIP:
      return {
        ...state,
        zipCode: action.payload !== "null" ? action.payload : null
      };
    default:
      return state;
  }
};
