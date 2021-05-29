import React, { useEffect, useState } from "react";

import { PublicRoutes } from "./publicRoutes";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES } from "../app/common/constants/usertypes";
import { AdminRoutes } from "./adminRoutes";

export const Routes = () => {
  const { user } = useSelector((state) => state.public);

  useEffect(() => {
    console.log(user);
  }, [user]);

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
