import { ADD_TO_CART } from "../actions/types";

const initialState = {
  carts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        carts: action.payload
      };

    default:
      return state;
  }
}
