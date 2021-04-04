import React from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../app/routes/PrivateRoute";
import Matches from "../features/controller/matches";

export const ControllerRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/"} component={Matches} />
    </Switch>
  );
};
