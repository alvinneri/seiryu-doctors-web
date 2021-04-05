import React from "react";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "../app/routes/PrivateRoute";

import Home from "../features/admin/Home";
import Categories from "../features/admin/categories";
import Users from "../features/admin/users";
import ManageGcash from "../features/admin/manageGcash";
import Matches from "../features/admin/matches";
import ManageBanks from "../features/admin/banks";
import Banks from "../features/loader/banks";
import GCash from "../features/loader/gcash";
import Transactions from "../features/admin/transactions";
import Withdraw from "../features/admin/withdraw";
import BetHistory from "../features/admin/bethistory";
import { Settings } from "../features/admin/settings";
import CreditRequest from "../features/admin/creditRequest";
export const AdminRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path={"/"} component={Home} />
      <PrivateRoute exact path={"/categories"} component={Categories} />
      <PrivateRoute exact path={"/users"} component={Users} />
      <PrivateRoute exact path={"/manage-gcash"} component={ManageGcash} />
      <PrivateRoute exact path={"/manage-matches"} component={Matches} />
      <PrivateRoute exact path={"/manage-banks"} component={ManageBanks} />
      <PrivateRoute exact path={"/gcash"} component={GCash} />
      <PrivateRoute exact path={"/banks"} component={Banks} />
      <PrivateRoute exact path={"/transactions"} component={Transactions} />
      <PrivateRoute exact path={"/withdrawal-request"} component={Withdraw} />
      <PrivateRoute exact path={"/bet-history"} component={BetHistory} />
      <PrivateRoute exact path={"/app-settings"} component={Settings} />
      <PrivateRoute exact path={"/credit-request"} component={CreditRequest} />
    </Switch>
  );
};
