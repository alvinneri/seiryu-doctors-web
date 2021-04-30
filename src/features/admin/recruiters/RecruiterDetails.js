import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Button, Table } from "antd";
import {
  setRecruitedPlayers,
  resetRecruited,
} from "../../../store/admin/actions";
import { CopyFilled } from "@ant-design/icons";
import { columns } from "./Columns";
import { useHistory, useParams } from "react-router";
const { Text } = Typography;

const RecruitedDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.public);
  const { recruitedPlayers } = useSelector((state) => state.admin);
  const [_users, setUsers] = useState([]);
  const history = useHistory();

  const getUsers = async () => {
    const usersRef = await db.collection("users");
    const snapshot = await usersRef.where("invitedBy", "==", id).get();
    // let _users = [];

    if (!snapshot.empty) {
      snapshot.forEach(async (doc) => {
        const betHistory = db.collection("bet_history");
        const _snapshot = await betHistory
          .where("uid", "==", doc.data().uid)
          .get();
        let _totals = 0;
        if (!_snapshot.empty) {
          _snapshot.forEach((doc) => {
            _totals = _totals + parseInt(doc.data().amount);
          });
        }
        let docs = {
          ...doc.data(),
          id: doc.id,
          total: _totals,
        };
        // console.log(docs, "docs");
        // setUsers([..._users, docs]);
        dispatch(setRecruitedPlayers(docs));
      });
    }
    // console.log(_users);
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
    return _totals;
  };

  useEffect(() => {
    if (id) {
      dispatch(resetRecruited([]));
      getUsers();
    }
  }, [id]);

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
    <div style={{ height: "80vh", overflow: "scroll" }}>
      <Button onClick={() => history.goBack()}>Back</Button>
      <Table
        columns={columns}
        dataSource={recruitedPlayers}
        summary={(pageData) => {
          console.log(pageData, "pageData");
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

export default RecruitedDetails;
