import React, { useEffect, useState } from "react";
import { Space, Popconfirm, Button } from "antd";
import moment from "moment";

import { db } from "../../../firebase/config";
import { toast } from "react-toastify";

export const columns = [
  {
    title: "User Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "User Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "User Type",
    dataIndex: "userType",
    key: "userType",
  },
  {
    title: "Total Bets",
    dataIndex: "total",
    key: "total",
    render: (total, record) => {
      console.log(total);
      return <Space size="middle">{total}</Space>;
    },
  },
];
