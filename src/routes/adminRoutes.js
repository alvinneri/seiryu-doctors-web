import React from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../app/routes/PrivateRoute";

import Home from "../features/admin/Home";
import Categories from "../features/admin/categories";
import Users from "../features/admin/users";

export const AdminRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/"} component={Home} />
      <PrivateRoute exact path={"/categories"} component={Categories} />
      <PrivateRoute exact path={"/users"} component={Users} />
    </Switch>
  );
};
