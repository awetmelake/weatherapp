import { FETCH_CURRENT, FETCH_WEEKLY, CHANGE_FOCUS } from "./types";

let lat, long;
let api = "26fca3f9bb1b046809163a15b71d418b";

export const fetchCurrent = payload => dispatch => {
  //fetch data for current and weekly forecast on load, send to store
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      lat = pos.coords.latitude;
      long = pos.coords.longitude;
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`
      )
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: FETCH_CURRENT,
            payload: data
          });
        });
    });
  } else {
    alert("please enable location services");
  }
};

export const fetchWeekly = payload => dispatch => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      lat = pos.coords.latitude;
      long = pos.coords.longitude;
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${api}`
      )
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: FETCH_WEEKLY,
            payload: data
          });
        });
    });
  } else {
    alert("please enable location services");
  }
};

export const changeFocus = payload => dispatch => {
  dispatch({
    type: CHANGE_FOCUS,
    payload
  });
};
