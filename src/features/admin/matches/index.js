import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../store/admin/actions";
import { db } from "../../../firebase/config";
import { DownOutlined } from "@ant-design/icons";
import {
  Layout,
  Menu,
  Dropdown,
  Input,
  Button,
  Form,
  Row,
  Col,
  Popconfirm,
} from "antd";

import CurrentMatch from "./CurrentMatch";
import { toast } from "react-toastify";

const { Header, Content } = Layout;

const Matches = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.admin);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState(null);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [matchNumber, setMatchNumber] = useState("");

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

  useEffect(() => {
    if (selectedCategory) {
      getCurrentMatch();
    }
  }, [selectedCategory]);

  useEffect(() => {
    getCurrentMatch();
  }, []);

  const getCurrentMatch = async () => {
    const categoriesRef = await db
      .collection("categories")
      .doc(selectedCategory.id);
    const unsubcribed = categoriesRef.onSnapshot((doc) => {
      console.log(doc.data());

      if (doc?.data()?.match) {
        setCurrentMatch({
          ...doc?.data()?.match,
          id: doc.id,
        });
      } else {
        setCurrentMatch(null);
      }
    });
    return unsubcribed;
  };

  const Categories = (
    <Menu>
      {categories.map((item, index) => {
        return (
          <Menu.Item key={index} onClick={() => setSelectedCategory(item)}>
            <p>{item.name}</p>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const createNewMatch = async () => {
    if (!name) {
      toast.error("Match name is required.");
      return;
    }
    if (!matchNumber) {
      toast.error("Match Number is required.");
      return;
    }
    if (!selectedCategory) {
      toast.error("Category is required.");
      return;
    }
    const categoriesRef = await db
      .collection("categories")
      .doc(selectedCategory.id)
      .update({
        match: {
          name: name,
          status: "OPEN",
          result: "PENDING",
          number: matchNumber,
          meron: {
            totalBets: 0,
          },
          wala: {
            totalBets: 0,
          },
        },
      })
      .then(() => {
        toast.success("New Match Created.");
        setName("");
        setMatchNumber("");
      });
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Dropdown overlay={Categories}>
            <p className="ant-dropdown-link">
              {selectedCategory ? selectedCategory.name : "Select Category"}{" "}
              <DownOutlined />
            </p>
          </Dropdown>
        </Menu>
      </Header>
      <Layout>
        <Content
          style={{ margin: "24px 16px 0", height: "100%", overflow: "scroll" }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Row>
              <Col span={8}>
                <div>
                  <Form>
                    <Form.Item>
                      <Input
                        placeholder="Match Name"
                        value={name}
                        onChange={(text) => setName(text.target.value)}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Input
                        placeholder="Match Number"
                        value={matchNumber}
                        onChange={(text) => setMatchNumber(text.target.value)}
                      />
                    </Form.Item>

                    <Form.Item>
                      <Popconfirm
                        title="Do you want to create a new match? Creating a new match will replace the current live match. "
                        onConfirm={createNewMatch}
                        onCancel={null}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary">NEW MATCH</Button>
                      </Popconfirm>
                    </Form.Item>
                  </Form>
                </div>
              </Col>
            </Row>

            {currentMatch ? (
              <CurrentMatch currentMatch={currentMatch} />
            ) : (
              <p>No matches for this category</p>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Matches;
