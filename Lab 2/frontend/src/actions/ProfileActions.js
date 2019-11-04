import axios from "axios";
import { rooturl } from "../config/settings";
import { GET_PROFILE_DETAILS } from "./types";
import { UPDATE_PROFILE_DETAILS } from "./types";

export function getProfileDetails(callback) {
  const request = axios.get("http://" + rooturl + ":3001/profile-details");
  return dispatch => {
    request.then(res => {
      dispatch({
        type: GET_PROFILE_DETAILS,
        payload: res.data
      });
      callback(res);
    });
  };
}
/*export function getProfileDetails(values, callback) {
  return async function(dispatch) {
    console.log("Inside Get Profile Details");
    axios.defaults.withCredentials = true;

    var ProfileImage = "";
    var result = {
      data: {},
      imageData: ""
    };
    var token = localStorage.getItem("token");
    var errorRedirect = false;

    await axios
      .get("http://" + rooturl + ":3001/profile-details")
      .then(response => {
        result.data = response.data;
        ProfileImage = response.data.ProfileImage;
      })
      .catch(err => {
        var result = {
          errorRedirect: true
        };
        dispatch({
          type: GET_PROFILE_DETAILS,
          payload: result
        });
      });
    // console.log("ProfileImage", ProfileImage);
    // await axios
    //   .post("http://" + rooturl + ":3001/download-file/" + ProfileImage, {
    //     headers: { Authorization: `Bearer ${token}` }
    //   })
    //   .then(response => {
    //     result.imageData = "data:image/jpg;base64, " + response.data;
    //   })
    //   .catch(err => {
    //     errorRedirect = true;
    //     // dispatch({
    //     //     type: GET_PROFILE_DETAILS_FAILURE,
    //     //     payload: errorRedirect
    //     // });
    //   });

    dispatch({
      type: GET_PROFILE_DETAILS,
      payload: result
    });
  };
}*/
