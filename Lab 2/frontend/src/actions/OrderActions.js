import { rooturl } from "../config/settings";
import { ADD_TO_CART } from "./types";
import axios from "axios";

export const addtocart = postData => dispatch => {
  console.log("addtocart action called");

  axios.defaults.withCredentials = true;
  axios
    .post(`${rooturl}/addtocart`, postData)
    .then(response => {
      console.log("response", response.data);
      if (response.status === 200) {
        // var result = {
        //   isSave: true
        // };
        dispatch({
          type: ADD_TO_CART,
          payload: response.data
        });
      }
    })
    .catch(err => {
      console.log("Error Occured");
      var result = {
        errorRedirect: true
      };
      dispatch({
        type: ADD_TO_CART,
        payload: result
      });
    });
};
