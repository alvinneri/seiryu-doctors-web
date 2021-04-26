import { SET_RECRUITED_USERS, RESET_RECRUITED } from "./constants";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";

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
