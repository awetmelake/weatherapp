import { FETCH_CURRENT, ADD_LOCATION } from "./types";

const api = "26fca3f9bb1b046809163a15b71d418b";
export const fetchCurrent = () => dispatch => {
  let lat, long;
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      lat = pos.coords.latitude;
      long = pos.coords.longitude;
      fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`)
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

export const addLocation = location => dispatch => {
  let apiString = `http://api.openweathermap.org/data/2.5/weather?zip=${location},us&appid=${api}`;
  fetch(apiString)
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: ADD_LOCATION,
        payload: location
      })
    );
};
