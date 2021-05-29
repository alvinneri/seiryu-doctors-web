import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../features/auth/Register";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Register} />
    </Switch>
  );
};
