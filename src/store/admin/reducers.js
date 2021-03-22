import { SET_CATEGORIES, SET_USERS, SET_NUMBERS, SET_BANKS } from "./constants";
const initialState = {
  categories: [],
  users: [],
  numbers: [],
  banks: [],
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
    case SET_BANKS: {
      return {
        ...state,
        banks: payload,
      };
    }

    default:
      return state;
  }
}
