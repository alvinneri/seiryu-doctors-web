import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../store/admin/actions";
import { db } from "../../../firebase/config";
import { DownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Table } from "antd";
import { columns } from "./Columns";

const { Header, Content } = Layout;

const Audit = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.admin);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [history, setHistory] = useState([]);

  const [drawMultiplier, setDrawMultplier] = useState("");

  const [appPercentage, setAppPercentage] = useState(0);
  const [betLimits, setBetLimits] = useState(10000);
  const [id, setDocId] = useState(null);

  const getAppSettings = async () => {
    const appSettingRef = db.collection("app_settings");
    const unsubscribe = appSettingRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        setBetLimits(doc.data().betLimits);
        setAppPercentage(doc.data().appPercentage);
        setDrawMultplier(doc.data().drawMultiplier);
        setDocId(doc.id);
      });
    });

    return unsubscribe;
  };

  useEffect(() => {
    getAppSettings();
  }, []);

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
      getMatchHistories();
    }
  }, [selectedCategory]);

  const getMatchHistories = async () => {
    const categoriesRef = await db
      .collection("fights")
      .where("categoryId", "==", selectedCategory.id)
      .orderBy("date", "desc");

    const unsubcribed = categoriesRef.onSnapshot((snapshot) => {
      let _histories = [];
      if (snapshot.docs.length) {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          if (doc?.data()) {
            _histories.push({
              ...doc?.data(),
              totalBets:
                doc.data().wala?.totalBets +
                doc.data().draw?.totalBets +
                doc.data().meron?.totalBets,
              id: doc.id,
              data: {
                ...doc.data(),
                id: doc.id,
                drawMultiplier: drawMultiplier,
                appPercentage: appPercentage,
              },
            });
          }
        });
      } else {
        setHistory([]);
      }
      console.log(_histories);
      setHistory(_histories);
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
            <Table columns={columns} dataSource={history} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Audit;
