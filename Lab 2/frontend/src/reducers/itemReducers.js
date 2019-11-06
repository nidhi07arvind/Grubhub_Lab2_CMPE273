import { ADD_ITEMS, UPDATE_ITEMS, DELETE_ITEMS } from "../actions/types";

const initialState = {
  item: {},
  updated_item: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEMS:
      return {
        ...state,
        item: action.payload
      };

    case UPDATE_ITEMS:
      return {
        ...state,
        updated_item: action.payload
      };

    default:
      return state;
  }
}
