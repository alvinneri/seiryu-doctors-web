import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../features/auth/Register";
import Login from "../features/auth/Login";
import Home from "../features/admin/Home";
import { PrivateRoute } from "../app/routes/PrivateRoute";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Register} />
      <Route exact path={"/admin"} component={Login} />
      <PrivateRoute exact path={"/home"} component={Home} />
    </Switch>
  );
};
