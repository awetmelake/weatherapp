import { FETCH_CURRENT, FETCH_WEEKLY } from "../actions/types";

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

const intialState = {
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
