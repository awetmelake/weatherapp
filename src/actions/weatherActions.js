import { FETCHED_CURRENT, FETCHED_WEEKLY, CHANGED_FOCUS } from "./types";

let api = "26fca3f9bb1b046809163a15b71d418b";

export const fetchCurrent = payload => (dispatch, getState) => {
  const userZip = getState().location.zipCode;
  const userLocation = getState().location.coords;

  //prioritize user zipcode over coordinates
  if (userZip !== null) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${userZip}&appid=${api}`
    ).then(res =>
      res.json().then(data => {
        dispatch({
          type: FETCHED_CURRENT,
          payload: data
        });
      })
    );
  } else {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.long}&appid=${api}`
    )
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: FETCHED_CURRENT,
          payload: data
        });
      });
  }
};

export const fetchWeekly = payload => (dispatch, getState) => {
  const userZip = getState().location.zipCode;
  const userLocation = getState().location.coords;

  //prioritize user zipcode over coords
  if (userZip !== null) {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?zip=${userZip}&appid=${api}`
    ).then(res =>
      res.json().then(data => {
        dispatch({
          type: FETCHED_WEEKLY,
          payload: data
        });
      })
    );
  } else {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${userLocation.lat}&lon=${userLocation.long}&appid=${api}`
    )
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: FETCHED_WEEKLY,
          payload: data
        });
      });
  }
};

export const changeFocus = payload => (dispatch, getState) => {
  const currentFocus = getState().weather.focus;
  if (payload !== currentFocus) {
    dispatch({
      type: CHANGED_FOCUS,
      payload
    });
  }
};
