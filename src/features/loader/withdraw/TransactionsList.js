import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "../../../store/loader/actions";
import { db } from "../../../firebase/config";
import { List, Typography, Divider, Input, Button, Form } from "antd";
import moment from "moment";
import { toast } from "react-toastify";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.loader);
  const { user } = useSelector((state) => state.public);
  const [refNo, setRefNo] = useState("");
  const [trans, setTrans] = useState([]);
  const [amount, setAmount] = useState("");

  const getTransactions = async () => {
    const transactionsRef = db.collection("transactions");

    const snapshot = await transactionsRef
      .where("type", "==", "WITHDRAW")
      .where("status", "==", "PENDING")
      .orderBy("date", "desc");

    const unsubscribed = snapshot.onSnapshot((querySnapshot) => {
      let docs = [];
      querySnapshot.forEach(async (doc) => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setTrans(docs);
      dispatch(setTransactions(docs));
    });

    return unsubscribed;
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const updateCredits = async (item) => {
    const userRef = db.collection("users").doc(item.uid);
    const doc = await userRef.get();
    if (doc.exists) {
      let _credits = doc.data().credits;
      userRef.update({
        credits: _credits - amount,
      });

      const transactionsRef = db
        .collection("transactions")
        .doc(item.id)
        .update({
          status: "DONE",
        });
      await getTransactions();
      toast.success("Transaction Successfully Processed.");
    }
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
      <h3>List Of Pending Withdrawals</h3>
      {/*<Form onSubmit={search}>
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
    </Form>*/}
      <List
        style={{ height: "74vh", overflow: "scroll" }}
        size="small"
        bordered
        dataSource={trans}
        renderItem={(item, index) => {
          return (
            <div key={index}>
              <List.Item className="transactions-list-item">
                <div>
                  <p>{`Amount: ${item.amount}`}</p>
                  <p>{`Date: ${moment(item.date.toDate()).format(
                    "MMM DD YYYY h:mm A"
                  )}`}</p>
                  <p>{`User Name: ${item.name}`}</p>
                  <p>{`Status: ${item.status}`}</p>
                  <p>{`Option: ${item.option}`}</p>
                  <p>{`Bank/Gcash Number: ${
                    item.option !== "Gcash"
                      ? item.bank_account
                      : item.gcash_number
                  }`}</p>
                  <Form.Item>
                    <Input
                      style={{ marginTop: "0.3em" }}
                      placeholder="Enter No. of Credits to be deducted."
                      value={amount}
                      type="number"
                      onChange={(text) => setAmount(text.target.value)}
                    />
                    <Button
                      type="primary"
                      style={{ marginTop: "1em" }}
                      onClick={() => updateCredits(item)}
                    >
                      Update Credits of User
                    </Button>
                  </Form.Item>
                </div>
              </List.Item>
              <Divider />
            </div>
          );
        }}
      />
    </div>
  );
};

export default Transactions;
