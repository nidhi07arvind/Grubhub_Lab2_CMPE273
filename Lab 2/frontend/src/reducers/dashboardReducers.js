import {
  GET_DASHBOARD,
  RESTAURANT_ITEMS,
  CART_DETAILS,
  PLACE_ORDER
} from "../actions/types";

const initialState = {
  items: [],
  restaurants: [],
  cart_items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD:
      return {
        ...state,
        items: action.payload
      };

    case RESTAURANT_ITEMS:
      return {
        ...state,
        restaurants: action.payload
      };

    case CART_DETAILS:
      return {
        ...state,
        cart_items: action.payload
      };

    case PLACE_ORDER:
      return {
        ...state,
        cart_items: action.payload
      };
    default:
      return state;
  }
}

/*import { GET_DASHBOARD } from "../actions/types";

const initialState = {
  courses: []
};

export default function course(state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD:
      return Object.assign({}, state, {
        courses: action.courses
      });
    default:
      return state;
  }
}
*/
