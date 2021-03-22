import { SET_CATEGORIES, SET_USERS, SET_NUMBERS, SET_BANKS } from "./constants";
import { SET_LOADING } from "../public/constants";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";

export const setCategories = (payload) => {
  return {
    type: SET_CATEGORIES,
    payload: payload,
  };
};

export const setUsers = (payload) => {
  return {
    type: SET_USERS,
    payload: payload,
  };
};

export const setNumbers = (payload) => {
  return {
    type: SET_NUMBERS,
    payload: payload,
  };
};

export const setBanks = (payload) => {
  return {
    type: SET_BANKS,
    payload: payload,
  };
};
