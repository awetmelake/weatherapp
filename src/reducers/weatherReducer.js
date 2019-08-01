import { FETCH_CURRENT, FETCH_WEEKLY, CHANGE_FOCUS } from "../actions/types";

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
    case CHANGE_FOCUS:
      return {
        ...state,
        focus: action.payload
      };
    default:
      return state;
  }
};

// verbose initalstate so initial render is not based on an empty state, causing undefined variables as api fetch is in process
const intialState = {
  focus: 0,
  current: {
    coord: { lon: 0, lat: 0 },
    weather: [{ id: 0, main: "", description: "", icon: "" }],
    base: "",
    main: {
      temp: 0,
      pressure: 0,
      humidity: 0,
      temp_min: 0,
      temp_max: 0
    },
    visibility: 0,
    wind: { speed: 0, deg: 0 },
    clouds: { all: 0 },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      message: 0,
      country: "US",
      sunrise: 0,
      sunset: 0
    },
    timezone: 0,
    id: 0,
    name: "",
    cod: 0
  },
  weekly: { cod: "", message: 0, cnt: 0, list: [] }
};
