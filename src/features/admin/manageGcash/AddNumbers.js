import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddNumbers = ({ visible, setVisible }) => {
  const { numbers } = useSelector((state) => state.admin);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  const submit = async () => {
    const uniq = numbers.filter((item) => item.phoneNumber === phoneNumber);

    if (phoneNumber && name) {
      if (uniq.length > 0) {
        toast.error("Phone Number already exist.");
        return;
      }

      try {
        await db.collection("gcash_numbers").add({
          phoneNumber: phoneNumber,
          name: name,
        });
        setPhoneNumber("");
        setName("");
        setVisible(false);
        toast.success("Phone Number Added");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("Name and Phonenumber are required.");
    }
  };

  return (
    <Modal
      title="Add Numbers"
      visible={visible}
      onOk={submit}
      onCancel={() => setVisible(false)}
    >
      <Form>
        <Form.Item>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(text) => setPhoneNumber(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Name"
            value={name}
            onChange={(text) => setName(text.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNumbers;
