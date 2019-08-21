import { TOGGLED_UNIT_TYPE } from "./types";

export const toggleMetric = payload => dispatch => {
  dispatch({
    type: TOGGLED_UNIT_TYPE
  });
};
