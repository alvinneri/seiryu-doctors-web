import {
  SET_SELECTED_USER,
  SET_TRANSACTION_ID,
  SET_REFERENCE_NO,
  SET_TRANSACTIONS,
  SET_AMOUNT,
} from "./constants";
import { SET_LOADING } from "../public/constants";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";

export const setSelectedUser = (payload) => {
  return {
    type: SET_SELECTED_USER,
    payload: payload,
  };
};

export const setTransactionId = (payload) => {
  return {
    type: SET_TRANSACTION_ID,
    payload: payload,
  };
};

export const setReferenceNo = (payload) => {
  return {
    type: SET_REFERENCE_NO,
    payload: payload,
  };
};

export const setTransactions = (payload) => {
  return {
    type: SET_TRANSACTIONS,
    payload: payload,
  };
};

export const setAmountRequest = (payload) => {
  return {
    type: SET_AMOUNT,
    payload: payload,
  };
};
