import React, { useState } from "react";
import NumbersList from "./Numbers";
import { Layout, Menu, Modal } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import AddNumbers from "./AddNumbers";

const { Header, Content } = Layout;

const ManageGcash = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={{ height: "100%" }}>
      <AddNumbers visible={visible} setVisible={setVisible} />
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item
            key="1"
            icon={<AppstoreAddOutlined />}
            onClick={() => setVisible(true)}
          >
            Add Numbers
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content
          style={{ margin: "24px 16px 0", height: "100%", overflow: "scroll" }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <NumbersList />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageGcash;
