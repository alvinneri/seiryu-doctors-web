import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "../../../store/loader/actions";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Input, Button, Form } from "antd";
import moment from "moment";
import { usePagination } from "use-pagination-firestore";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.loader);
  const { user } = useSelector((state) => state.public);
  const [refNo, setRefNo] = useState("");
  const [trans, setTrans] = useState([]);

  const { items, isLoading, isStart, isEnd, getPrev, getNext } = usePagination(
    db
      .collection("loader_transactions")
      .where("loaderId", "==", user.uid)
      .orderBy("date", "desc"),
    {
      limit: 10,
    }
  );

  const _search = async (refNo) => {
    const transactionsRef = db.collection("loader_transactions");

    const snapshot = await transactionsRef
      .where("refNo", "==", refNo)
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

  // const getTransactions = async () => {
  //   const transactionsRef = db.collection("loader_transactions");

  //   const snapshot = await transactionsRef
  //     .where("loaderId", "==", user.uid)
  //     .orderBy("date", "desc")
  //     .get();
  //   if (snapshot.empty) {
  //     dispatch(setTransactions([]));
  //     return;
  //   }

  //   let docs = [];
  //   snapshot.forEach(async (doc) => {
  //     docs.push({
  //       ...doc.data(),
  //       id: doc.id,
  //     });
  //   });
  //   setTrans(docs);
  //   dispatch(setTransactions(docs));
  // };

  useEffect(() => {
    // getTransactions();
    setTrans(items);
  }, [items]);

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
      setTrans(items);
      return;
    }
    _search(refNo);
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
        style={{ height: "40vh", overflow: "scroll" }}
        size="small"
        bordered
        dataSource={trans}
        renderItem={(item) => <Item item={item} />}
      />
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

export default Transactions;
