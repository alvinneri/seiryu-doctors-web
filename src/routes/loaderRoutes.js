import React from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../app/routes/PrivateRoute";
import Credits from "../features/loader/credits";

import Home from "../features/loader/Home";

export const LoaderRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/"} component={Home} />
      <PrivateRoute exact path={"/credits"} component={Credits} />
    </Switch>
  );
};
