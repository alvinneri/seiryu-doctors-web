import React, { useState } from "react";
import UsersList from "./Users";
import { Layout, Row, Col, Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { useSelector } from "react-redux";
const { Header, Content, Sider } = Layout;

const Credits = () => {
  const [refNo, setRefNo] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useSelector((state) => state.public);

  const onSubmit = async () => {
    if (!refNo && !amount) {
      toast.error("Input amount and gcash reference number");
      return;
    }

    const transactionRef = db.collection("transactions");

    const snapshot = await transactionRef
      .where("gcashRefNo", "==", refNo)
      .where("status", "==", "PENDING")
      .get();

    if (snapshot.empty) {
      toast.error("GCash Ref No. is invalid.");
      return;
    }

    snapshot.forEach(async (doc) => {
      const userRef = db.collection("users");
      const oldCredits = await userRef.doc(doc.data().uid).get();
      if (!oldCredits.exists) {
        toast.error("No matching documents.");
        return;
      }

      userRef.doc(doc.data().uid).update({
        credits: parseInt(oldCredits.data().credits) + parseInt(amount),
      });

      const loaderRef = await db.collection("loader_transactions").add({
        gcashRefNo: refNo,
        amount: amount,
        loader: user.uid,
        name: user.name,
        email: user.email,
        credited: doc.data().uid,
      });

      transactionRef.doc(doc.id).update({
        status: "DONE",
      });

      toast.success("Credits Successfully Added.");
      setRefNo("");
      setAmount("");
    });
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Layout>
        <Sider style={{ padding: "1em" }}>
          <Form>
            <Form.Item>
              <Input
                placeholder="Enter Gcash Ref No."
                value={refNo}
                onChange={(text) => setRefNo(text.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Enter Amount"
                value={amount}
                type="number"
                min="0"
                step="1"
                onChange={(text) => setAmount(text.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={onSubmit}>
                Add Credits
              </Button>
            </Form.Item>
          </Form>
        </Sider>
        <Content
          style={{ margin: "24px 16px 0", height: "100%", overflow: "scroll" }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <UsersList />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Credits;
