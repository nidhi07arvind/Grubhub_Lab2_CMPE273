import { GET_PROFILE_DETAILS } from "../actions/types";

const initialState = {
  //errorRedirect: false
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_DETAILS:
      return {
        ...state,
        items: action.payload
        //result: action.payload
      };

    default:
      return state;
  }
}
