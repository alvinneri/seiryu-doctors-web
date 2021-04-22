import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Button, Table } from "antd";
import { setRecruitedPlayers } from "../../../store/recruiter/actions";
import { CopyFilled } from "@ant-design/icons";
import { columns } from "./Columns";
const { Text } = Typography;

const RecruitedPlayers = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.public);
  const { recruitedPlayers } = useSelector((state) => state.recruiter);

  const getUsers = async () => {
    const usersRef = await db.collection("users");
    const snapshot = await usersRef.where("invitedBy", "==", user.uid).get();
    if (!snapshot.empty) {
      let _users = [];
      let _totals = 0;
      snapshot.forEach(async (doc) => {
        const betHistory = db.collection("bet_history");
        const _snapshot = await betHistory
          .where("uid", "==", doc.data().uid)
          .get();
        console.log(!_snapshot.empty, "!_snapshot.empty");
        if (!_snapshot.empty) {
          _snapshot.forEach((doc) => {
            _totals = _totals + parseInt(doc.data().amount);
            console.log(_totals, "_totals");
          });
        }
        let docs = {
          ...doc.data(),
          id: doc.id,
          total: _totals,
        };
        console.log(docs);
        _users.push(docs);
        dispatch(setRecruitedPlayers(_users));
      });
    }
  };

  const getTotalBets = async (uid) => {
    let _totals = 0;
    const betHistory = await db.collection("bet_history");
    const snapshot = await betHistory.where("uid", "==", uid).get();
    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        let docs = {
          ...doc.data(),
          id: doc.id,
        };
        _totals = _totals + parseInt(doc.data().amount);
      });
    }
    console.log(_totals);
    return _totals;
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
            <p>{`Total:${getTotalBets(item.id)}`}</p>
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
      <Table
        columns={columns}
        dataSource={recruitedPlayers}
        summary={(pageData) => {
          let totalBets = 0;

          pageData.forEach(({ total }) => {
            totalBets += total;
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>Total</Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text type="danger">{totalBets}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
};

export default RecruitedPlayers;
