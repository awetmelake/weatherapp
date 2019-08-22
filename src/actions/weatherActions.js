import { FETCHED_CURRENT, FETCHED_WEEKLY, CHANGED_FOCUS } from "./types";

let api = "26fca3f9bb1b046809163a15b71d418b";

export const fetchCurrent = payload => (dispatch, getState) => {
  const userZip = localStorage.zipcode;
  const userLocation = getState().location.coords;

  //prioritize zipcode over coordinates
  var fetchedData;
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${userZip}&appid=${api}`
    )
      .then(res =>
        res.json().then(data => {
          fetchedData = data;
          //if zip was invalid fetch by coords and resolve
          if (data.message === "city not found") {
            dispatch({
              type: "FETCH_ERROR",
              payload: "invalid zipcode"
            });
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.long}&appid=${api}`
            )
              .then(res => res.json())
              .then(data => {
                fetchedData = data;
              });
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
    setTimeout(() => {
      dispatch({
        type: FETCHED_CURRENT,
        payload: fetchedData
      });
      resolve();
    }, 500);
  });
};

export const fetchWeekly = type => (dispatch, getState) => {
  const userZip = localStorage.zipcode;
  const userLocation = getState().location.coords;

  //prioritize user zipcode over coords
  var fetchedData;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?zip=${userZip}&appid=${api}`
  ).then(res =>
    res.json().then(data => {
      fetchedData = data;
      //if zip was invalid fetch by coords
      if ((data.message = "city not found")) {
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${userLocation.lat}&lon=${userLocation.long}&appid=${api}`
        )
          .then(res => res.json())
          .then(data => {
            fetchedData = data;
            dispatch({
              type: FETCHED_WEEKLY,
              payload: fetchedData
            });
          });
      }
    })
  );
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
