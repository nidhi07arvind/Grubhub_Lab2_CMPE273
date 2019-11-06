import { rooturl } from "../config/settings";
import { ADD_ITEMS, UPDATE_ITEMS, DELETE_ITEMS } from "./types";
import axios from "axios";

export const additems = postData => dispatch => {
  console.log("additems action called");

  axios.defaults.withCredentials = true;
  axios
    .post(`${rooturl}/additem`, postData)
    .then(response => {
      console.log("response", response.data);
      if (response.status === 200) {
        var result = {
          isSave: true
        };
        dispatch({
          type: ADD_ITEMS,
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
        type: ADD_ITEMS,
        payload: result
      });
    });
};

export const updateitems = postData => dispatch => {
  console.log("updateitems action called");

  axios.defaults.withCredentials = true;
  axios
    .post(`${rooturl}/update-item`, postData)
    .then(response => {
      console.log("response", response.data);
      if (response.status === 200) {
        var result = {
          isUpdate: true
        };
        dispatch({
          type: UPDATE_ITEMS,
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
        type: UPDATE_ITEMS,
        payload: result
      });
    });
};

export const deleteitems = postData => dispatch => {
  console.log("updateitems action called");

  axios
    .post(`${rooturl}/delete-item`, postData)
    .then(response => {
      console.log("response", response.data);
      if (response.status === 200) {
        // var result = {
        //   isUpdate: true
        // };
        dispatch({
          type: DELETE_ITEMS
          // payload: result
        });
      }
    })
    .catch(err => {
      console.log("Error Occured");
      var result = {
        errorRedirect: true
      };
      dispatch({
        type: DELETE_ITEMS,
        payload: result
      });
    });
};
