import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/config";
import { List, Divider, Typography, Button, Form, Input } from "antd";
import { USER_TYPES } from "../../../app/common/constants/usertypes";
import { toast } from "react-toastify";
import { setReferenceNo } from "../../../store/loader/actions";

const UsersList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.public);
  const {
    selectedUser,
    selectedTransactionId,
    selectedReferenceNo,
  } = useSelector((state) => state.loader);
  const [userArr, setUser] = useState([]);
  const [amount, setAmount] = useState("");

  const getUser = async () => {
    const userRef = await db.collection("users").doc(selectedUser);

    const unsubscribed = userRef.onSnapshot((doc) => {
      let _user = [];
      _user.push(doc.data());
      setUser([..._user]);
      console.log(_user, "user array");
    });

    return unsubscribed;
  };

  useEffect(() => {
    if (selectedUser) {
      (async () => {
        await getUser();
      })();
    } else {
      setUser([]);
    }
  }, [selectedUser]);

  const addCredits = async (item) => {
    if (!amount || !selectedUser) {
      toast.error("Enter amount.");
      return;
    }

    if (!selectedReferenceNo) {
      toast.error("Search for reference no first.");
      return;
    }

    const userRef = db
      .collection("users")
      .doc(selectedUser)
      .update({
        credits: parseInt(item.credits) + parseInt(amount),
      });

    const loaderRef = await db.collection("loader_transactions").add({
      refNo: selectedReferenceNo,
      amount: amount,
      loaderId: user.uid,
      loaderName: user.name,
      loaderEmail: user.email,
      creditedUser: selectedUser,
      creditedName: item.name,
      creditedEmail: item.email,
      date: new Date(),
    });

    await db.collection("transactions").doc(selectedTransactionId).update({
      status: "DONE",
    });

    toast.success("Credits Successfully Added.");
    setAmount("");
    dispatch(setReferenceNo(null));
  };

  return (
    <div>
      <List
        size="small"
        header={<h3>User Details</h3>}
        bordered
        dataSource={userArr}
        renderItem={(item, index) => {
          return (
            <div key={index}>
              <List.Item className="users-list-item">
                <div>
                  <Typography>Name: {item?.name}</Typography>
                  <Typography>Email: {item?.email}</Typography>
                  <Typography>
                    Phone Number: {item?.phoneNumber ? item?.phoneNumber : ""}
                  </Typography>
                  <Typography>Credits: {item?.credits}</Typography>
                  <Form.Item>
                    <Input
                      style={{ marginTop: "1em" }}
                      placeholder="Enter No. of Credits"
                      value={amount}
                      type="number"
                      onChange={(text) => setAmount(text.target.value)}
                    />
                    <Button
                      type="primary"
                      style={{ marginTop: "1em" }}
                      onClick={() => addCredits(item)}
                    >
                      Add Credits
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

export default UsersList;
