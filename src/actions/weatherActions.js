import { FETCHED_CURRENT, FETCHED_WEEKLY, CHANGED_FOCUS, LOADING_INIT, LOADING_COMPLETE } from "./types";

let api = "26fca3f9bb1b046809163a15b71d418b";

export const fetchCurrent = payload => (dispatch, getState) => {
  const userZip = localStorage.zipcode;
  const coords = getState().location.coords;
  let fetchedData;
  dispatch({type: LOADING_INIT})
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${userZip}&appid=${api}`
    )
      .then(res => {
        res.json().then(data => {
        if(data.cod === "404"){
          dispatch({
            type: "FETCH_ERROR" , payload: "invalid zipcode"
          })
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${api}`
          )
            .then(res => res.json())
            .then(data => {
              fetchedData = data;
              dispatch({
                type: FETCHED_CURRENT, payload: fetchedData
              })
              dispatch({type: LOADING_COMPLETE})
              
            });
        }else {
          fetchedData = data;
          dispatch({
            type: FETCHED_CURRENT, payload: fetchedData
          })
          dispatch({type: LOADING_COMPLETE})
        }
        });
      })
      .catch(err => {
        dispatch({
          type: "FETCH_ERROR" , payload: "invalid zipcode"
        })
      });


};

export const fetchWeekly = type => (dispatch, getState) => {
  const userZip = localStorage.zipcode;
  const coords = getState().location.coords;

  //prioritize user zipcode over coords
  var fetchedData;
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?zip=${userZip}&appid=${api}`
  ).then(res =>
    res.json().then(data => {
      fetchedData = data;
      //if zip was invalid fetch by coords
      if (data.cod = "404") {
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.long}&appid=${api}`
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
