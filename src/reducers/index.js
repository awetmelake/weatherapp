import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";
import unitReducer from "./unitReducer";
import locationReducer from "./locationReducer";

export default combineReducers({
  weather: weatherReducer,
  unit: unitReducer,
  location: locationReducer
});
