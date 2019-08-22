import { FETCHED_USER_LOCATION, FETCHED_USER_ZIP } from "./types";
import { fetchCurrent, fetchWeekly } from "./weatherActions";
//get user location coordinates from browser
export const fetchUserLocation = () => dispatch => {
  let userCoords = {};

  //return promse that resolves after the user zipcode and or locaton is dispatched
  return new Promise((resolve, reject) => {
    if (localStorage.zipcode || navigator.geolocation) {
      dispatch({
        type: FETCHED_USER_ZIP,
        payload: localStorage.zipcode
      });
      navigator.geolocation.getCurrentPosition(pos => {
        userCoords.lat = pos.coords.latitude;
        userCoords.long = pos.coords.longitude;

        dispatch({
          type: FETCHED_USER_LOCATION,
          payload: userCoords
        });
      });
      setTimeout(() => {
        resolve();
      }, 500);
    }
    //lastly reject promise]
    else {
      reject("please enable location services, or enter your zipcode");
    }
  });
};

//get user zipcode
export const fetchUserZip = zip => dispatch => {
  localStorage.setItem("zipcode", zip);
  dispatch({
    type: FETCHED_USER_ZIP,
    payload: zip
  });
  // setTimeout(() => {
  //   fetchCurrent();
  //   fetchWeekly();
  // }, 500);
};
