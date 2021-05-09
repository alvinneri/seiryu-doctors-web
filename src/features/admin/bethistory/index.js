import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBetHistory } from "../../../store/admin/actions";
import { db } from "../../../firebase/config";
import { List, Divider, Button, Table } from "antd";
import moment from "moment";
import { usePagination } from "use-pagination-firestore";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const BetHistory = () => {
  const dispatch = useDispatch();
  const { betHistory } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.public);

  const { items, isLoading, isStart, isEnd, getPrev, getNext } = usePagination(
    db.collection("bet_history").orderBy("date", "desc"),
    {
      limit: 10,
    }
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Id",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <p>{moment(text.toDate()).format("MMM-DD-YY h:mm A")}</p>
      ),
    },
    {
      title: "Match Name",
      dataIndex: "matchName",
      key: "matchName",
    },
    {
      title: "Match Number",
      dataIndex: "matchNumber",
      key: "matchNumber",
    },
    {
      title: "Bet",
      dataIndex: "bet",
      key: "bet",
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
    },
  ];

  const Item = ({ item }) => {
    return (
      <div>
        <Table columns={columns} dataSource={items} />
        {/*<List.Item className="transactions-list-item">
          <div>
            <p>{`Date: ${moment(item.date.toDate()).format(
              "MMM-DD-YYYY h:mm A"
            )}`}</p>
            <p>{`User Id: ${item.uid}`}</p>
            <p>{`User Name: ${item?.name ? item?.name : "N/A"}`}</p>
            <p>{`Match Name: ${item.matchName}`}</p>
            <p>{`Match Number: ${item.matchNumber}`}</p>
            <p>{`Amount: ${item.amount}`}</p>
            <p>{`Bet: ${item?.bet ? item?.bet.toUpperCase() : "N/A"}`}</p>
            <p>{`Result: ${item.result ? item.result : "N/A"}`}</p>
          </div>
            </List.Item>*/}
        <Divider />
      </div>
    );
  };

  return (
    <div style={{ height: "80vh", overflow: "scroll" }}>
      <h3>List Of Past Bets</h3>
      {/*<List
        style={{ height: "70vh", overflow: "scroll" }}
        size="small"
        bordered
        dataSource={items}
        renderItem={(item) => <Item item={item} />}
      />*/}
      <Table columns={columns} dataSource={items} />
      <div
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          margin: "1em",
        }}
      >
        <Button onClick={getPrev} disabled={isStart}>
          PREV <LeftOutlined />
        </Button>
        <Button onClick={getNext} disabled={isEnd}>
          NEXT <RightOutlined />
        </Button>
      </div>
    </div>
  );
};

export default BetHistory;
