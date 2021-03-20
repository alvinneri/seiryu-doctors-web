import { SET_USER, SET_LOADING } from "./constants";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";

export function setUser(data) {
  return {
    type: SET_USER,
    payload: data,
  };
}

export function setLoading(data) {
  return {
    type: SET_LOADING,
    payload: data,
  };
}

export const login = (payload) => {
  console.log(payload);
  return async function (dispatch) {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      await auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(async (user) => {
          db.collection("users")
            .doc(user.user.uid)
            .get()
            .then((doc) => {
              toast.success("Login Success");
              dispatch({ type: SET_USER, payload: doc.data() });
              console.log(doc.data());
            });
        })
        .catch((err) => toast.error(err.message));
      // toast.success(data)
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING, payload: false });
    }
  };
};
