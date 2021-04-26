import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Button, Table } from "antd";
import { setRecruiters, resetRecruited } from "../../../store/admin/actions";
import { CopyFilled } from "@ant-design/icons";
import { useHistory } from "react-router";
const { Text } = Typography;

const Recruiters = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.public);
  const { recruiters } = useSelector((state) => state.admin);
  const history = useHistory();

  const columns = [
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
      title: "Details",
      dataIndex: "id",
      key: "id",
      render: (id, record) => {
        return (
          <Button
            type="primary"
            onClick={() => history.push(`/admin-recruiters/recruiter/${id}`)}
          >
            Details
          </Button>
        );
      },
    },
  ];

  const getRecruiters = async () => {
    const usersRef = await db.collection("users");
    const snapshot = await usersRef.where("userType", "==", "RECRUITER").get();
    let _recruiters = [];
    if (!snapshot.empty) {
      snapshot.forEach(async (doc) => {
        _recruiters.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      dispatch(setRecruiters(_recruiters));
    }
    // console.log(_users);
  };

  useEffect(() => {
    dispatch(resetRecruited());

    getRecruiters();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={recruiters} />
    </div>
  );
};

export default Recruiters;
