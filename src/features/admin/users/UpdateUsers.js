import React, { useEffect, useState } from "react";
import { Modal, Select, Form, Input } from "antd";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../store/public/actions";

const { Option } = Select;

const UpdateCategories = ({ visible, setVisible, item }) => {
  const { users } = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(item);
    setName(item?.name);
    setUserType(item?.userType);
    setId(item?.id);
  }, [item]);

  const handleUserTypeChange = (value) => {
    setUserType(value);
  };

  const submit = async () => {
    dispatch(setLoading(true));
    if (name && userType) {
      try {
        await db.collection("users").doc(id).update({
          name: name,
          userType: userType,
        });
        setVisible(false);
        toast.success("User Updated");
      } catch (err) {
        toast.error(err.message);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      toast.error("Name and Usertype are required.");
      dispatch(setLoading(false));
    }
  };

  return (
    <Modal
      title="Update User"
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
          <Select value={userType} onChange={handleUserTypeChange}>
            <Option value="RECRUITER">Recruiter</Option>
            <Option value="LOADER">Loader</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateCategories;
