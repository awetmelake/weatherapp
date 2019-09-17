import { FETCHED_USER_LOCATION, FETCHED_USER_ZIP } from "./types";
import { fetchCurrent, fetchWeekly } from "./weatherActions";
//get user location coordinates from browser
export const fetchUserLocation = () => dispatch => {

  //return promse that resolves after the user zipcode and or locaton is dispatched to state
  return new Promise((resolve, reject) => {
  if (navigator.geolocation) {
      let userCoords = {};
      navigator.geolocation.getCurrentPosition(pos => {
        userCoords.lat = pos.coords.latitude;
        userCoords.long = pos.coords.longitude;

        dispatch({
          type: FETCHED_USER_ZIP,
          payload: localStorage.zipcode
        });

        dispatch({
          type: FETCHED_USER_LOCATION,
          payload: userCoords
        });
        resolve();
      });

    } else {
      //reject promise
      reject(alert("please enable location services, or enter your zipcode"));
    }
  });
};

export const setUserZip = zip => dispatch => {
  localStorage.setItem("zipcode", zip);
  dispatch({
    type: FETCHED_USER_ZIP,
    payload: zip
  });

};
