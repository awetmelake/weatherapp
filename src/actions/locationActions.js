import { FETCHED_USER_LOCATION, FETCHED_USER_ZIP } from "./types";

//get user location coordinates from browser
export const fetchUserLocation = () => dispatch => {
  let userCoords = {};

  //return promse that resolves after the user locaton is pushed to state
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        userCoords.lat = pos.coords.latitude;
        userCoords.long = pos.coords.longitude;
        dispatch({
          type: FETCHED_USER_LOCATION,
          payload: userCoords
        });
        resolve();
      });
    } else {
      reject("please enable location services, or enter your zipcode");
    }
  });
};

//get user zipcode
export const fetchUserZip = zip => dispatch => {
  localStorage.setItem("zipcode", zip)
  dispatch({
    type: FETCHED_USER_ZIP,
    payload: zip
  });
};
