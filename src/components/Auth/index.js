import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../../store/public/actions";
import { db, auth } from "../../firebase/config";

export const Auth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      try {
        const userData = await db.doc("/users/" + user?.uid).get();
        dispatch(setUser(userData.data()));
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(setLoading(false));
      }
    });
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};