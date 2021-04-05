import React, { useEffect, useState } from "react";
import { Layout, Row, Menu, Form, Input, Button, Typography } from "antd";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
const { Header, Content, Sider } = Layout;

export const Settings = () => {
  const [appPercentage, setAppPercentage] = useState(0);
  const [betLimits, setBetLimits] = useState(10000);
  const [betMin, setBetMin] = useState(100);
  const [id, setDocId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    setSubmitting(true);
    if (id) {
      const appSettingRef = db.collection("app_settings").doc(id).update({
        appPercentage,
        betLimits,
        betMin,
      });
    } else {
      const appSettingRef = db.collection("app_settings").add({
        appPercentage,
        betLimits,
        betMin,
      });
    }
    toast.success("App Settings Updated");
    setSubmitting(false);
  };

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

  return (
    <Layout style={{ height: "100%" }}>
      <Header>
        <Typography style={{ color: "#ffffff" }}>
          Application Settings
        </Typography>
      </Header>
      <Layout>
        <Content
          style={{ margin: "24px 16px 0", height: "100%", overflow: "scroll" }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Form>
              <Form.Item>
                <span>App % Cut (in percent)</span>
                <Input
                  placeholder="App % Cut."
                  value={appPercentage}
                  onChange={(text) => setAppPercentage(text.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <span>Maximum Bet Allowed</span>
                <Input
                  placeholder="Maximum Bet Allowed."
                  value={betLimits}
                  onChange={(text) => setBetLimits(text.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <span>Minimum Bet Allowed</span>
                <Input
                  placeholder="Minimum Bet Allowed."
                  value={betMin}
                  onChange={(text) => setBetMin(text.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={onSubmit}
                  disabled={submitting ? true : false}
                >
                  UPDATE
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
