import { TOGGLED_UNIT_TYPE } from "../actions/types";

const intialState = {
  metric: false
};

export default (state = intialState, action) => {
  switch (action.type) {
    case TOGGLED_UNIT_TYPE:
      return {
        ...state,
        metric: !state.metric
      };
    default:
      return state;
  }
};
