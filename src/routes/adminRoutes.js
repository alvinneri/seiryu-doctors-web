import React from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "../app/routes/PrivateRoute";

import Home from "../features/admin/Home";
import Doctors from "../features/admin/Doctors";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import UploadCsv from "../features/admin/Upload";

export const AdminRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/home"} component={Home} />
      <PrivateRoute exact path={"/doctors"} component={Doctors} />
      <PrivateRoute exact path={"/upload-csv"} component={UploadCsv} />
      <PrivateRoute exact path={"/admin"} component={Login} />
      <PrivateRoute exact path={"/"} component={Register} />
    </Switch>
  );
};
