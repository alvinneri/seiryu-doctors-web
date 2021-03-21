import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateCategories = ({ visible, setVisible, item }) => {
  const { categories } = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    setName(item?.name);
    setPhoneNumber(item?.phoneNumber);
    setId(item?.id);
  }, [item]);

  const submit = async () => {
    if (name && phoneNumber) {
      try {
        await db.collection("gcash_numbers").doc(id).update({
          name: name,
          phoneNumber: phoneNumber,
        });
        setPhoneNumber("");
        setName("");
        setVisible(false);
        toast.success("Category Updated");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("Name and URL are required.");
    }
  };

  return (
    <Modal
      title="Update Category"
      visible={visible}
      onOk={submit}
      onCancel={() => setVisible(false)}
    >
      <Form>
        <Form.Item>
          <Input
            placeholder="Name"
            value={name}
            onChange={(text) => setName(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(text) => setPhoneNumber(text.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategories;
