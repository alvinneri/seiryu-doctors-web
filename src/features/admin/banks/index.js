import React, { useState } from "react";
import BanksList from "./Banks";
import { Layout, Menu, Modal } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import AddBanks from "./AddBanks";

const { Header, Content } = Layout;

const Banks = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={{ height: "100%" }}>
      <AddBanks visible={visible} setVisible={setVisible} />
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item
            key="1"
            icon={<AppstoreAddOutlined />}
            onClick={() => setVisible(true)}
          >
            Add Banks
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content
          style={{ margin: "24px 16px 0", height: "100%", overflow: "scroll" }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <BanksList />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Banks;
