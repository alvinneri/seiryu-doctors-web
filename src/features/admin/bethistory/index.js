import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBetHistory } from "../../../store/admin/actions";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Input, Button, Form } from "antd";
import moment from "moment";

const BetHistory = () => {
  const dispatch = useDispatch();
  const { betHistory } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.public);

  const getBetsHistory = async () => {
    const betRef = db.collection("bet_history");
    const snapshot = await betRef.orderBy("date", "desc").get();

    if (snapshot.empty) {
      dispatch(setBetHistory([]));
      return;
    }

    let docs = [];
    snapshot.forEach(async (doc) => {
      docs.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    console.log(docs);
    dispatch(setBetHistory(docs));
  };

  useEffect(() => {
    getBetsHistory();
  }, []);

  const Item = ({ item }) => {
    return (
      <div>
        <List.Item className="transactions-list-item">
          <div>
            <p>{`Date: ${moment(item.date.toDate()).format(
              "MMM-DD-YYYY h:mm A"
            )}`}</p>
            <p>{`User Id: ${item.uid}`}</p>
            <p>{`Match Name: ${item.matchName}`}</p>
            <p>{`Match Number: ${item.matchNumber}`}</p>
            <p>{`Amount: ${item.amount}`}</p>
          </div>
        </List.Item>
        <Divider />
      </div>
    );
  };

  return (
    <div>
      <h3>List Of Past Bets</h3>
      <List
        style={{ height: "70vh", overflow: "scroll" }}
        size="small"
        bordered
        dataSource={betHistory}
        renderItem={(item) => <Item item={item} />}
      />
    </div>
  );
};

export default BetHistory;
