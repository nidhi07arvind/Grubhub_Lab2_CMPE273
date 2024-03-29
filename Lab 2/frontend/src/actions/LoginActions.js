import { rooturl } from "../config/settings";
import { SIGNUP } from "./types";
import axios from "axios";

export const signup = postData => dispatch => {
  console.log("signup action called");

  axios.defaults.withCredentials = true;
  axios
    .post(`${rooturl}/signup`, postData)
    .then(response => {
      console.log("response", response.data);
      if (response.status === 200) {
        var result = {
          isNewUserCreated: true
        };
        dispatch({
          type: SIGNUP,
          payload: result
        });
      }
    })
    .catch(err => {
      console.log("Error Occured");
      var result = {
        errorRedirect: true
      };
      dispatch({
        type: SIGNUP,
        payload: result
      });
    });
};
