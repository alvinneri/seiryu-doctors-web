import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UpdateCategories = ({ visible, setVisible, item }) => {
  const { categories } = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const [twitchUrl, setTwitchUrl] = useState("");

  useEffect(() => {
    setName(item?.name);
    setUrl(item?.url);
    setId(item?.id);
    setTwitchUrl(item?.twitchUrl);
  }, [item]);

  const submit = async () => {
    if (name && url) {
      try {
        await db.collection("categories").doc(id).update({
          name: name,
          url: url,
          twitchUrl: twitchUrl,
        });
        setUrl("");
        setName("");
        setTwitchUrl("");
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
            placeholder="Youtube Url"
            value={url}
            onChange={(text) => setUrl(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Twitch Url"
            value={twitchUrl}
            onChange={(text) => setTwitchUrl(text.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategories;
