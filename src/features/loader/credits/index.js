import React, { useState } from "react";
import UsersList from "./Users";
import { Layout, Row, Col, Form, Input, Button } from "antd";
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

const Credits = () => {
  const [refNo, setRefNo] = useState("");
  const [amount, setAmount] = useState("");
  const { user } = useSelector((state) => state.public);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    if (!refNo) {
      dispatch(setLoading(false));
      toast.error("Input reference number");
      return;
    }

    const transactionRef = db.collection("transactions");
    const snapshot = await transactionRef
      .where("refNo", "==", refNo)
      .where("status", "==", "PENDING")
      .get();

    if (snapshot.empty) {
      toast.error("Reference No. is invalid.");
      dispatch(setSelectedUser(null));
      return;
    }

    snapshot.forEach(async (doc) => {
      console.log(doc.data());
      dispatch(setSelectedUser(doc.data().uid));
      dispatch(setTransactionId(doc.id));
      dispatch(setReferenceNo(refNo));
      // userRef.doc(doc.data().uid).update({
      //   credits: parseInt(oldCredits.data().credits) + parseInt(amount),
      // });

      // const loaderRef = await db.collection("loader_transactions").add({
      //   refNo: refNo,
      //   amount: amount,
      //   loader: user.uid,
      //   name: user.name,
      //   email: user.email,
      //   credited: doc.data().uid,
      // });

      // transactionRef.doc(doc.id).update({
      //   status: "DONE",
      // });

      // toast.success("Credits Successfully Added.");
      // setRefNo("");
      // setAmount("");
    });
  };

  return (
    <Layout style={{ height: "100%" }}>
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
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
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

export default Credits;
