import React from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../app/routes/PrivateRoute";

import Home from "../features/admin/Home";
import Doctors from "../features/admin/Doctors";

export const AdminRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/home"} component={Home} />
      <PrivateRoute exact path={"/doctors"} component={Doctors} />
    </Switch>
  );
};
