import { SET_RECRUITED_USERS } from "./constants";
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

    default:
      return state;
  }
}
