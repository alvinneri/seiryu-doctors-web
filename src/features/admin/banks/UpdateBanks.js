import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateBank = ({ visible, setVisible, item }) => {
  const { banks } = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setName(item?.name);
    setBank(item?.bank);
    setId(item?.id);
    setAccountNumber(item?.accountNumber);
  }, [item]);

  const submit = async () => {
    if (name && accountNumber && bank) {
      try {
        await db.collection("banks").doc(id).update({
          name: name,
          accountNumber: accountNumber,
          bank: bank,
        });
        setAccountNumber("");
        setBank("");
        setName("");
        setVisible(false);
        toast.success("Bank Updated");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("All fields are required.");
    }
  };

  const deleteBank = async () => {
    const res = await db.collection("banks").doc(id).delete();
    setVisible(false);
    toast.success("Bank Succesfully Deleted");
    console.log(res);
  };

  return (
    <Modal
      title="Update Bank"
      visible={visible}
      onOk={submit}
      onCancel={() => setVisible(false)}
    >
      <Form>
        <Form.Item>
          <Input
            placeholder="Bank"
            value={bank}
            onChange={(text) => setBank(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Account Number"
            value={accountNumber}
            onChange={(text) => setAccountNumber(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Account Name"
            value={name}
            onChange={(text) => setName(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ background: "red", color: "white" }}
            onClick={deleteBank}
          >
            Delete Bank
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateBank;
