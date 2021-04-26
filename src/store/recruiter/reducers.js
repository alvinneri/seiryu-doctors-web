import { SET_RECRUITED_USERS, RESET_RECRUITED } from "./constants";
const initialState = {
  recruitedPlayers: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
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
