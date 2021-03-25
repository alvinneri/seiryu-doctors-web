import React from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../app/routes/PrivateRoute";

import RecruitedPlayers from "../features/recruiter/recruited";

export const RecruiterRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/"} component={RecruitedPlayers} />
    </Switch>
  );
};
