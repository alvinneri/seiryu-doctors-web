import { SET_CATEGORIES, SET_USERS } from "./constants";
const initialState = {
  categories: [],
  users: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CATEGORIES: {
      return {
        ...state,
        categories: payload,
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: payload,
      };
    }

    default:
      return state;
  }
}
