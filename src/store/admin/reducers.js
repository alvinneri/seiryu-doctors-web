import {
  SET_CATEGORIES,
  SET_USERS,
  SET_NUMBERS,
  SET_BANKS,
  SET_BET_HISTORY,
  SET_CREDIT_REQUESTS,
  SET_RECRUITERS,
  SET_RECRUITED_USERS,
  RESET_RECRUITED,
} from "./constants";
const initialState = {
  categories: [],
  users: [],
  numbers: [],
  banks: [],
  betHistory: [],
  creditRequest: [],
  recruiters: [],
  recruitedPlayers: [],
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
    case SET_BET_HISTORY: {
      return {
        ...state,
        betHistory: payload,
      };
    }
    case SET_CREDIT_REQUESTS: {
      return {
        ...state,
        creditRequest: payload,
      };
    }
    case SET_RECRUITERS: {
      return {
        ...state,
        recruiters: payload,
      };
    }
    case SET_RECRUITED_USERS: {
      return {
        ...state,
        recruitedPlayers: [...state.recruitedPlayers, payload] || [],
      };
    }
    case RESET_RECRUITED: {
      return {
        ...state,
        recruitedPlayers: [],
      };
    }

    default:
      return state;
  }
}
