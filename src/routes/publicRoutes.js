import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../features/admin/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import RegisterRef from "../features/auth/RegisterRef";
import Twitch from "../features/admin/twitch";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Login} />
      <Route exact path={"/register"} component={Register} />
      <Route exact path={"/register/:id"} component={RegisterRef} />
      <Route path={"/public/twitch"} component={Twitch} />
    </Switch>
  );
};
