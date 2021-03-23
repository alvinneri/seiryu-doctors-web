import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "../../../store/loader/actions";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Input, Button, Form } from "antd";
import moment from "moment";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.loader);
  const { user } = useSelector((state) => state.public);
  const [refNo, setRefNo] = useState("");
  const [trans, setTrans] = useState([]);

  const getTransactions = async () => {
    const transactionsRef = db.collection("loader_transactions");

    const snapshot = await transactionsRef
      .where("loaderId", "==", user.uid)
      .orderBy("date", "desc")
      .get();

    if (snapshot.empty) {
      dispatch(setTransactions([]));
      return;
    }

    let docs = [];
    snapshot.forEach(async (doc) => {
      docs.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setTrans(docs);
    dispatch(setTransactions(docs));
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const Item = ({ item }) => {
    return (
      <div>
        <List.Item className="transactions-list-item">
          <div>
            <p>{`Amount: ${item.amount}`}</p>
            <p>{`Ref No.: ${item.refNo}`}</p>
            <p>{`Date: ${moment(item.date.toDate()).format(
              "MMM DD YYYY h:mm A"
            )}`}</p>
            <p>{`User Name: ${item.creditedName}`}</p>
          </div>
        </List.Item>
        <Divider />
      </div>
    );
  };

  const search = () => {
    if (!refNo) {
      getTransactions();
      return;
    }
    const result = transactions.filter((item) => item.refNo === refNo);
    setTrans(result);
    console.log(refNo);
  };

  return (
    <div>
      <h3>List Of Transactions</h3>
      <Form onSubmit={search}>
        <Form.Item>
          <Input
            placeholder="Reference No."
            value={refNo}
            onChange={(text) => setRefNo(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={search}>
            SEARCH
          </Button>
        </Form.Item>
      </Form>
      <List
        style={{ height: "54vh", overflow: "scroll" }}
        size="small"
        bordered
        dataSource={trans}
        renderItem={(item) => <Item item={item} />}
      />
    </div>
  );
};

export default Transactions;
