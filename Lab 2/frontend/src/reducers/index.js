import { combineReducers } from "redux";
import signupReducer from "./signupReducers";
import profileReducers from "./profileReducers";
import itemReducers from "./itemReducers";
import dashboardReducers from "./dashboardReducers";
import orderReducers from "./orderReducers";

export default combineReducers({
  posts: signupReducer,
  profile: profileReducers,
  course: itemReducers,
  r_items: dashboardReducers,
  orders: orderReducers
});
