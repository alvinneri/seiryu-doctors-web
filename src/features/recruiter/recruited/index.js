import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Button } from "antd";
import { setRecruitedPlayers } from "../../../store/recruiter/actions";
import { CopyFilled } from "@ant-design/icons";

const RecruitedPlayers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.public);
  const { recruitedPlayers } = useSelector((state) => state.recruiter);

  const getUsers = async () => {
    const usersRef = await db.collection("users");

    const snapshot = await usersRef.where("invitedBy", "==", user.uid).get();

    if (!snapshot.empty) {
      let _users = [];
      snapshot.forEach((doc) => {
        let docs = {
          ...doc.data(),
          id: doc.id,
        };
        _users.push(docs);
      });
      dispatch(setRecruitedPlayers(_users));
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const Item = ({ item }) => {
    return (
      <div>
        <List.Item className="category-list-item">
          <div>
            <p>{`Name: ${item.name}`}</p>
            <p>{`Email: ${item.email}`}</p>
            <p>{`Usertype: ${item.userType}`}</p>
          </div>
        </List.Item>
        <Divider />
      </div>
    );
  };

  return (
    <div>
      <Typography style={{ marginBottom: "1em" }}>
        Recruit players by sharing this code to earn points.
      </Typography>
      <Button
        type="primary"
        onClick={() => {
          navigator.clipboard.writeText(user.uid);
        }}
        style={{ margin: "1em" }}
      >
        <CopyFilled />
        COPY REFERRAL CODE
      </Button>
      <span>{user.uid}</span>
      <List
        size="small"
        header={<h3>List Of Recruited Players</h3>}
        bordered
        dataSource={recruitedPlayers}
        renderItem={(item) => <Item item={item} />}
      />
    </div>
  );
};

export default RecruitedPlayers;
