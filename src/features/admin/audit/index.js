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
  Table,
  Tag,
  Space,
} from "antd";

import CurrentMatch from "./CurrentMatch";
import { toast } from "react-toastify";
import { columns } from "./Columns";

const { Header, Content } = Layout;

const Audit = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.admin);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState(null);
  const [history, setHistory] = useState([]);
  const [matchNumber, setMatchNumber] = useState("");
  const [drawMultiplier, setDrawMultplier] = useState("");
  const [currentMatch, setCurrentMatch] = useState("");

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

  const deleteMatch = async () => {
    const categoriesRef = await db
      .collection("categories")
      .doc(selectedCategory.id)
      .update({
        match: null,
      })
      .then(() => {
        toast.success("Category has no current match.");
        setName("");
        setMatchNumber("");
      });
  };

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
            betters: [],
          },
          wala: {
            totalBets: 0,
            betters: [],
          },
          draw: {
            totalBets: 0,
            betters: [],
          },
        },
        isProcessed: false,
      })
      .then(() => {
        toast.success("New Match Created.");
        setName("");
        setMatchNumber("");
      });
  };

  const getPayout = (totalBets, totalSides) => {
    if (!totalSides) {
      return 0;
    }
    const origMultiplier = (totalBets / totalSides) * 100;
    console.log(origMultiplier);
    const percent = appPercentage / 100;
    const afterCut = origMultiplier - origMultiplier * percent;

    const payout = (totalBets / 100) * afterCut;
    return afterCut.toFixed(2);
  };

  const processCredits = async () => {
    if (!currentMatch) {
      toast.error("No Bets to be process.");
      return;
    }

    if (currentMatch.isProcessed) {
      toast.error("Bets already processed.");
      return;
    }

    if (currentMatch) {
      await db.collection("fights").add({
        ...currentMatch.match,
        date: new Date(),
        categoryId: selectedCategory.id,
      });

      const categoriesRef = await db
        .collection("categories")
        .doc(selectedCategory.id)
        .update({
          isProcessed: true,
        });

      if (currentMatch.match.result === "MERON") {
        await currentMatch.match.meron.betters.forEach(async (item, index) => {
          const userRef = await db.collection("users").doc(item.user);
          const user = await userRef.get();
          const credits = user.data()?.credits ? user.data()?.credits : 0;

          await userRef.update({
            credits:
              credits +
              (getPayout(
                currentMatch?.match?.meron?.totalBets +
                  currentMatch?.match?.wala?.totalBets,
                currentMatch?.match?.meron?.totalBets
              ) /
                100) *
                item.amount,
          });
        });
        toast.success("All bets were processed successfully.");
      } else if (currentMatch.match.result === "WALA") {
        currentMatch.match.wala.betters.forEach(async (item) => {
          const userRef = await db.collection("users").doc(item.user);
          const user = await userRef.get();
          const credits = user.data()?.credits ? user.data()?.credits : 0;

          await userRef.update({
            credits:
              credits +
              (getPayout(
                currentMatch?.match?.meron?.totalBets +
                  currentMatch?.match?.wala?.totalBets,
                currentMatch?.match?.wala?.totalBets
              ) /
                100) *
                item.amount,
          });
        });
        toast.success("All bets were processed successfully.");
      } else if (currentMatch.match.result === "DRAW") {
        currentMatch.match.draw.betters.forEach(async (item) => {
          const userRef = await db.collection("users").doc(item.user);
          const user = await userRef.get();
          const credits = user.data()?.credits ? user.data()?.credits : 0;

          await userRef.update({
            credits: credits + drawMultiplier * item.amount,
          });
        });
      }

      // deleteMatch();
    }
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
            <Table columns={columns} dataSource={history} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Audit;
