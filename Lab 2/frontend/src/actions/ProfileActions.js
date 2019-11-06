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
