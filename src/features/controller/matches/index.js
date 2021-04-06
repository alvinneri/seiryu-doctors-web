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
  const { user } = useSelector((state) => state.public);
  const { categories } = useSelector((state) => state.admin);
  const [categoryName, setCategoryName] = useState("");
  const [name, setName] = useState(null);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [matchNumber, setMatchNumber] = useState("");

  const [appPercentage, setAppPercentage] = useState(0);
  const [betLimits, setBetLimits] = useState(10000);
  const [id, setDocId] = useState(null);

  const getAppSettings = async () => {
    const appSettingRef = db.collection("app_settings");
    const unsubscribe = appSettingRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        setBetLimits(doc.data().betLimits);
        setAppPercentage(doc.data().appPercentage);
        setDocId(doc.id);
      });
    });

    return unsubscribe;
  };

  useEffect(() => {
    getAppSettings();
  }, []);

  useEffect(() => {
    getCurrentMatch();
  }, []);

  const getCurrentMatch = async () => {
    const categoriesRef = await db
      .collection("categories")
      .doc(user.controllerCategory);
    const unsubcribed = categoriesRef.onSnapshot((doc) => {
      setCategoryName(doc.data().name);

      if (doc?.data()?.match) {
        setCurrentMatch({
          ...doc?.data(),
          id: doc.id,
        });
      } else {
        setCurrentMatch(null);
      }
    });
    return unsubcribed;
  };

  const deleteMatch = async () => {
    const categoriesRef = await db
      .collection("categories")
      .doc(user.controllerCategory)
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

    const categoriesRef = await db
      .collection("categories")
      .doc(user.controllerCategory)
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
        categoryId: user.controllerCategory,
      });

      const categoriesRef = await db
        .collection("categories")
        .doc(user.controllerCategory)
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
      } else {
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
                currentMatch?.match?.meron?.totalBets
              ) /
                100) *
                item.amount,
          });
        });
        toast.success("All bets were processed successfully.");
      }

      // deleteMatch();
    }
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <p>Category: {categoryName}</p>
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
              <CurrentMatch
                currentMatch={currentMatch}
                deleteMatch={deleteMatch}
              />
            ) : (
              <p>No matches for this category</p>
            )}
            <Button type="danger" onClick={processCredits}>
              PROCESS CREDITS
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Matches;
