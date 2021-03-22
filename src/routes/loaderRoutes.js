import React from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../app/routes/PrivateRoute";
import GCash from "../features/loader/gcash";

import Home from "../features/loader/Home";
import Transactions from "../features/loader/transactions/TransactionsList";

export const LoaderRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/"} component={Home} />
      <PrivateRoute exact path={"/gcash"} component={GCash} />
      <PrivateRoute exact path={"/my-transactions"} component={Transactions} />
    </Switch>
  );
};
