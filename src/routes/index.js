import React, { useEffect, useState } from "react";
import { LoaderRoutes } from "./loaderRoutes";
import { RecruiterRoutes } from "./recruiterRoutes";
import { PublicRoutes } from "./publicRoutes";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES } from "../app/common/constants/usertypes";
import { AdminRoutes } from "./adminRoutes";
import { ControllerRoutes } from "./controllerRoutes";

export const Routes = () => {
  const { user } = useSelector((state) => state.public);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const getRoutes = () => {
    if (user) {
      if (user?.userType === USER_TYPES.ADMIN) {
        return <AdminRoutes />;
      } else if (user?.userType === USER_TYPES.LOADER) {
        return <LoaderRoutes />;
      } else if (user?.userType === USER_TYPES.RECRUITER) {
        return <RecruiterRoutes />;
      } else if (user?.userType === USER_TYPES.CONTROLLER) {
        return <ControllerRoutes />;
      } else {
        return <PublicRoutes />;
      }
    } else {
      return <PublicRoutes />;
    }
  };

  return <React.Fragment>{getRoutes()}</React.Fragment>;
};
