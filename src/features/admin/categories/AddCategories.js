import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddCategories = ({ visible, setVisible }) => {
  const { categories } = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const submit = async () => {
    const uniq = categories.filter((item) => item.name === name);

    if (name && url) {
      if (uniq.length > 0) {
        toast.error("Name already exist.");
        return;
      }

      try {
        await db.collection("categories").add({
          name: name,
          url: url,
        });
        setUrl("");
        setName("");
        setVisible(false);
        toast.success("Category Added");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      toast.error("Name and URL are required.");
    }
  };

  return (
    <Modal
      title="Add Categories"
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
            placeholder="Url"
            value={url}
            onChange={(text) => setUrl(text.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategories;
