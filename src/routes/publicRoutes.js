import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../features/admin/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Twitch from "../features/admin/twitch";

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Login} />
      <Route exact path={"/register"} component={Register} />
      <Route path={"/public/twitch"} component={Twitch} />
    </Switch>
  );
};
