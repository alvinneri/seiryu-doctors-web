import { SET_CATEGORIES, SET_USERS } from "./constants";
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
