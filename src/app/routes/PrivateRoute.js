import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ component, ...rest }) => {
  const { user } = useSelector((state) => state.public);

  return user ? (
    <Route {...rest} component={component} />
  ) : (
    <Redirect to="/log-in" />
  );
};
