import React, { useState } from "react";
import UsersList from "./Users";
import { Layout, Row, Col, Form, Input, Button, Typography } from "antd";
import { toast } from "react-toastify";
import { db } from "../../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedUser,
  setTransactionId,
  setReferenceNo,
} from "../../../store/loader/actions";
import { setLoading } from "../../../store/public/actions";
const { Header, Content, Sider } = Layout;

const Banks = () => {
  const [refNo, setRefNo] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useSelector((state) => state.public);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    setSubmitting(true);
    if (!refNo) {
      dispatch(setLoading(false));
      toast.error("Input reference number");
      setSubmitting(false);
      return;
    }

    const transactionRef = db.collection("transactions");

    const snapshot1 = await transactionRef
      .where("refNo", "==", refNo)
      .where("status", "==", "DONE")
      .where("method", "==", "BANK")
      .get();

    if (!snapshot1.empty) {
      toast.error("Reference No. already loaded.");
      setSubmitting(false);
      dispatch(setSelectedUser(null));
      return;
    }

    const snapshot2 = await transactionRef
      .where("refNo", "==", refNo)
      .where("status", "==", "PENDING")
      .where("method", "==", "BANK")
      .get();

    if (snapshot2.empty) {
      toast.error("Reference No. is invalid.");
      setSubmitting(false);
      dispatch(setSelectedUser(null));
      return;
    }

    let docs = [];
    snapshot2.forEach(async (doc) => {
      docs.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    dispatch(setSelectedUser(docs[0].uid));
    dispatch(setTransactionId(docs[0].id));
    dispatch(setReferenceNo(docs[0].refNo));
    setSubmitting(false);
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Header>
        <Typography style={{ color: "#ffffff" }}>
          Add Credits Via Bank Reference No.
        </Typography>
      </Header>
      <Layout>
        <Content
          style={{ margin: "24px 16px 0", height: "100%", overflow: "scroll" }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Form>
              <Form.Item>
                <Input
                  placeholder="Enter Ref No."
                  value={refNo}
                  onChange={(text) => setRefNo(text.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={onSubmit}
                  disabled={submitting ? true : false}
                >
                  Search
                </Button>
              </Form.Item>
            </Form>
            <UsersList />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Banks;
