import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Button, Table } from "antd";
import moment from "moment";
import { useHistory, useParams } from "react-router";
const { Text } = Typography;

const AddedCredits = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [_addedCredits, setAddedCredits] = useState([]);
  const { id } = useParams();

  const getCredits = async () => {
    const addedCredits = await db
      .collection("users")
      .doc(id)
      .collection("added_credits")
      .orderBy("date", "desc");

    const unsubcribed = await addedCredits.onSnapshot((snapshot) => {
      let credits = [];
      snapshot.forEach((doc) => {
        credits.push(doc.data());
      });
      console.log(credits, "credits");
      setAddedCredits(credits);
    });

    return unsubcribed;
  };

  useEffect(() => {
    getCredits();
  }, []);

  const columns = [
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
        <p>{moment(text.toDate()).format("MMM-DD-YYYY H:MM A")}</p>
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
  ];

  return (
    <div style={{ height: "80vh", overflow: "scroll" }}>
      <Button onClick={() => history.goBack()}>Back</Button>
      <Table columns={columns} dataSource={_addedCredits} />
    </div>
  );
};

export default AddedCredits;
