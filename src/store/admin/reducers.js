import {
  SET_CATEGORIES,
  SET_USERS,
  SET_NUMBERS,
  SET_BANKS,
  SET_BET_HISTORY,
} from "./constants";
const initialState = {
  categories: [],
  users: [],
  numbers: [],
  banks: [],
  betHistory: [],
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
    case SET_BET_HISTORY:
      {
      }
      return {
        ...state,
        betHistory: payload,
      };

    default:
      return state;
  }
}
