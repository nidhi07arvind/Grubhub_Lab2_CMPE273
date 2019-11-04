import { combineReducers } from "redux";
import signupReducer from "./signupReducers";
import profileReducers from "./profileReducers";

export default combineReducers({
  posts: signupReducer,
  profile: profileReducers
});
