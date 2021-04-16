import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../features/admin/Home";
import Login from "../features/auth/Login";
import Twitch from "../features/admin/twitch";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Login} />
      <Route exact path={"/public/twitch"} component={Twitch} />
    </Switch>
  );
};
