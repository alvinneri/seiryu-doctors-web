import {
  SET_SELECTED_USER,
  SET_TRANSACTION_ID,
  SET_REFERENCE_NO,
  SET_TRANSACTIONS,
  SET_AMOUNT,
} from "./constants";
const initialState = {
  selectedUser: null,
  selectedTransactionId: null,
  selectedReferenceNo: null,
  transactions: [],
  selectedAmount: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_SELECTED_USER: {
      return {
        ...state,
        selectedUser: payload,
      };
    }
    case SET_TRANSACTION_ID: {
      return {
        ...state,
        selectedTransactionId: payload,
      };
    }
    case SET_REFERENCE_NO: {
      return {
        ...state,
        selectedReferenceNo: payload,
      };
    }
    case SET_TRANSACTIONS: {
      return {
        ...state,
        transactions: payload,
      };
    }
    case SET_AMOUNT: {
      return {
        ...state,
        selectedAmount: payload,
      };
    }

    default:
      return state;
  }
}
