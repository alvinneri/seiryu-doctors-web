import { SET_USER, SET_LOADING } from "./constants";
const initialState = {
  loading: true,
  user: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER: {
      return {
        ...state,
        user: payload,
      };
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: payload,
      };
    }

    default:
      return state;
  }
}
