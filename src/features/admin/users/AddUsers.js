import React, { useState, useEffect } from "react";
import { Modal, Select, Form, Input } from "antd";
import { auth, db } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/public/actions";
import { setCategories } from "../../../store/admin/actions";
const { Option } = Select;

const AddCategories = ({ visible, setVisible }) => {
  const { users } = useSelector((state) => state.admin);
  const { categories } = useSelector((state) => state.admin);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const handleUserTypeChange = (value) => {
    if (value !== "CONTROLLER") {
      setCategory("");
    }
    setUserType(value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const getCategories = async () => {
    const categoriesRef = await db.collection("categories");
    const unsubcribed = categoriesRef.onSnapshot((snapshot) => {
      let _categories = [];
      snapshot.forEach((doc) => {
        let docs = {
          ...doc.data(),
          id: doc.id,
        };

        _categories.push(docs);
      });
      dispatch(setCategories(_categories));
    });
    return unsubcribed;
  };

  useEffect(() => {
    getCategories();
  }, []);

  const submit = async () => {
    dispatch(setLoading(true));
    if (name && email && password && userType) {
      try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        if (user) {
          try {
            if (category) {
              await db.collection("users").doc(auth.currentUser?.uid).set({
                name: name,
                email: email,
                userType: userType,
                uid: auth.currentUser?.uid,
                controllerCategory: category,
              });
            } else {
              await db.collection("users").doc(auth.currentUser?.uid).set({
                name: name,
                email: email,
                userType: userType,
                uid: auth.currentUser?.uid,
              });
            }

            toast.success("User Successfully created.");
          } catch (error) {
            toast.error(error.message);
          } finally {
            dispatch(setLoading(false));
          }
        }
        setPassword("");
        setEmail("");
        setName("");
        setVisible(false);
        toast.success("User Successfully created");
      } catch (err) {
        toast.error(err.message);
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setLoading(false));
      toast.error("Fill up all the required fields.");
    }
  };

  return (
    <Modal
      title="Add Users"
      visible={visible}
      onOk={submit}
      onCancel={() => setVisible(false)}
    >
      <Form>
        <Form.Item>
          <Input
            placeholder="Email"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Name"
            value={name}
            onChange={(text) => setName(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Password"
            value={password}
            onChange={(text) => setPassword(text.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Select defaultValue="RECRUITER" onChange={handleUserTypeChange}>
            <Option value="RECRUITER">Recruiter</Option>
            <Option value="LOADER">Loader</Option>
            <Option value="CONTROLLER">Controller</Option>
          </Select>
        </Form.Item>
        {userType === "CONTROLLER" && (
          <Form.Item>
            <Select onChange={handleCategoryChange}>
              {categories.map((item) => {
                return <Option value={item.id}>{item.name}</Option>;
              })}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default AddCategories;
