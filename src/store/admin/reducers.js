import { SET_CATEGORIES, SET_USERS, SET_NUMBERS } from "./constants";
const initialState = {
  categories: [],
  users: [],
  numbers: [],
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
    case SET_NUMBERS: {
      return {
        ...state,
        numbers: payload,
      };
    }

    default:
      return state;
  }
}
