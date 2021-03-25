import { SET_RECRUITED_USERS } from "./constants";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";

export function setRecruitedPlayers(data) {
  return {
    type: SET_RECRUITED_USERS,
    payload: data,
  };
}
