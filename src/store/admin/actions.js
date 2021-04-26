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

export const setBetHistory = (payload) => {
  return {
    type: SET_BET_HISTORY,
    payload: payload,
  };
};

export const setCreditRequests = (payload) => {
  return {
    type: SET_CREDIT_REQUESTS,
    payload: payload,
  };
};

export const setRecruiters = (payload) => {
  return {
    type: SET_RECRUITERS,
    payload: payload,
  };
};

export function setRecruitedPlayers(data) {
  return {
    type: SET_RECRUITED_USERS,
    payload: data,
  };
}

export function resetRecruited() {
  return {
    type: RESET_RECRUITED,
    payload: [],
  };
}
