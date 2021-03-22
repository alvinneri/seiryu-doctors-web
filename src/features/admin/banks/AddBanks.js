import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddCategories = ({ visible, setVisible }) => {
  const { banks } = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const submit = async () => {
    const uniq = banks.filter((item) => item.accountNumber === accountNumber);

    if (name && bank && accountNumber) {
      if (uniq.length > 0) {
        toast.error("Account Number already exist.");
        return;
      }

      try {
        await db.collection("banks").add({
          name: name,
          accountNumber: accountNumber,
          bank: bank,
        });
        setAccountNumber("");
        setBank("");
        setName("");
        setVisible(false);
        toast.success("Bank Added");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("All fields are required.");
    }
  };

  return (
    <Modal
      title="Add Bank"
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
            placeholder="Account Name"
            value={name}
            onChange={(text) => setName(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Account Number"
            value={accountNumber}
            onChange={(text) => setAccountNumber(text.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategories;
