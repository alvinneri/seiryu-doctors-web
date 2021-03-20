import React, { useState } from "react";
import UsersList from "./Users";
import { Layout, Menu, Modal } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import AddUsers from "./AddUsers";

const { Header, Content } = Layout;

const Users = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={{ height: "100%" }}>
      <AddUsers visible={visible} setVisible={setVisible} />
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item
            key="1"
            icon={<AppstoreAddOutlined />}
            onClick={() => setVisible(true)}
          >
            Add Users
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content
          style={{ margin: "24px 16px 0", height: "100%", overflow: "scroll" }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <UsersList />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Users;
