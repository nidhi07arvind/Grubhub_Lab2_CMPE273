import { rooturl } from "../config/settings";
import { SIGNUP } from "./types";
import axios from "axios";

/*export const signup = () => dispatch => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};*/

export const signup = postData => dispatch => {
  console.log("signup action called");

  axios.defaults.withCredentials = true;
  axios
    .post("http://" + rooturl + ":3001/signup", postData)
    .then(response => {
      console.log("response", response.data);
      if (response.status === 200) {
        var result = {
          isNewUserCreated: true
        };
        /*fetch("http://'+rooturl+':3001/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(post =>*/
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
