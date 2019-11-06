import { rooturl } from "../config/settings";
import {
  GET_DASHBOARD,
  RESTAURANT_ITEMS,
  CART_DETAILS,
  PLACE_ORDER
} from "./types";
import axios from "axios";

export const dashboarditems = () => dispatch => {
  console.log("dashboarditems action called");
  axios.defaults.withCredentials = true;
  const request = axios.get(`${rooturl}/owner-dashboard-details`);
  request
    .then(response => {
      console.log("response", response.data);
      if (response.status === 200) {
        // var result = {
        //   isUpdate: true
        // };
        dispatch({
          type: GET_DASHBOARD,
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
        type: GET_DASHBOARD,
        payload: result
      });
    });
};

export const restaurantitems = postData => dispatch => {
  console.log("restaurantitems action called");

  axios.defaults.withCredentials = true;

  axios
    .post(`${rooturl}/restaurant-display`, postData)
    .then(response => {
      console.log("response", response);
      if (response.status === 200) {
        // var result = {
        //   isSelected: true
        // };
        dispatch({
          type: RESTAURANT_ITEMS,
          payload: response.data
          //payload: result
        });
      }
    })
    .catch(err => {
      console.log("Error Occured");
      var result = {
        errorRedirect: true
      };
      dispatch({
        type: RESTAURANT_ITEMS,
        payload: result
      });
    });
};

export const cartitems = () => dispatch => {
  console.log("cartitems action called");

  axios.defaults.withCredentials = true;
  const request = axios.get(`${rooturl}/cart-details`);
  request
    .then(response => {
      console.log("response", response.data);
      if (response.status === 200) {
        // var result = {
        //   isUpdate: true
        // };
        dispatch({
          type: CART_DETAILS,
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
        type: CART_DETAILS,
        payload: result
      });
    });
};

export const placeorder = postData => dispatch => {
  console.log("restaurantitems action called");

  axios.defaults.withCredentials = true;

  axios
    .post(`${rooturl}/place-order`, postData)
    .then(response => {
      console.log("response", response);
      if (response.status === 200) {
        // var result = {
        //   isSelected: true
        // };
        dispatch({
          type: PLACE_ORDER,
          payload: response.data
          //payload: result
        });
      }
    })
    .catch(err => {
      console.log("Error Occured");
      var result = {
        errorRedirect: true
      };
      dispatch({
        type: PLACE_ORDER,
        payload: result
      });
    });
};
