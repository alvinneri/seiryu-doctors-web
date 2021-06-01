import React from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../app/routes/PrivateRoute";

import Home from "../features/admin/Home";

export const AdminRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/home"} component={Home} />
    </Switch>
  );
};
