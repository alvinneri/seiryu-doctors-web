import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCreditRequests } from "../../../store/admin/actions";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Input, Button, Form } from "antd";
import moment from "moment";
import { usePagination } from "use-pagination-firestore";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

const CreditRequests = () => {
  const dispatch = useDispatch();
  const { creditRequest } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.public);
  const [refNo, setRefNo] = useState("");
  const [trans, setTrans] = useState([]);

  const { items, isLoading, isStart, isEnd, getPrev, getNext } = usePagination(
    db
      .collection("transactions")
      .orderBy("date", "desc")
      .where("status", "==", "PENDING")
      .where("type", "==", "DEPOSIT"),
    {
      limit: 10,
    }
  );

  const _search = async (refNo) => {
    const transactionsRef = db.collection("transactions");

    const unsubscribed = await transactionsRef
      .where("status", "==", "PENDING")
      .where("type", "==", "DEPOSIT")
      .where("refNo", "==", refNo)
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.length);
        if (snapshot.empty) {
          dispatch(setCreditRequests([]));
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
        setTrans(docs);
        dispatch(setCreditRequests(docs));
      });

    return unsubscribed;
  };

  // const getCreditRequests = async () => {
  //   const transactionsRef = db.collection("transactions");

  //   const unsubscribed = await transactionsRef
  //     .orderBy("date", "desc")
  //     .where("status", "==", "PENDING")
  //     .where("type", "==", "DEPOSIT")
  //     .onSnapshot((snapshot) => {
  //       console.log(snapshot.docs.length);
  //       if (snapshot.empty) {
  //         dispatch(setCreditRequests([]));
  //         return;
  //       }

  //       let docs = [];
  //       snapshot.forEach(async (doc) => {
  //         docs.push({
  //           ...doc.data(),
  //           id: doc.id,
  //         });
  //       });
  //       console.log(docs);
  //       setTrans(docs);
  //       dispatch(setCreditRequests(docs));
  //     });

  //   return unsubscribed;
  // };

  useEffect(() => {
    // getCreditRequests();
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
            <p>{`User Name: ${item.name}`}</p>
            <p>{`Method: ${item.method}`}</p>
          </div>
        </List.Item>
        <Divider />
      </div>
    );
  };

  const search = () => {
    if (!refNo) {
      setTrans(items);
      // getCreditRequests();
      return;
    }
    _search(refNo);
  };

  return (
    <div>
      <h3>List Of Credit Request</h3>
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
        style={{ height: "45vh", overflow: "scroll" }}
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

export default CreditRequests;
