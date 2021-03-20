import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { PublicRoutes } from "./publicRoutes";
import { useSelector } from "react-redux";
import { USER_TYPES } from "../app/common/constants/usertypes";
import { AdminRoutes } from "./adminRoutes";

export const Routes = () => {
  const { user } = useSelector((state) => state.public);

  const getRoutes = () => {
    if (user) {
      if (user?.userType === USER_TYPES.ADMIN) {
        return <AdminRoutes />;
      } else {
        return <PublicRoutes />;
      }
    } else {
      return <PublicRoutes />;
    }
  };

  return <React.Fragment>{getRoutes()}</React.Fragment>;
};
