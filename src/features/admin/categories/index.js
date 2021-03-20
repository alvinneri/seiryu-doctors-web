import React, { useState } from "react";
import CategoriesList from "./Categories";
import { Layout, Menu, Modal } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import AddCategories from "./AddCategories";

const { Header, Content } = Layout;

const Categories = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout style={{ height: "100%" }}>
      <AddCategories visible={visible} setVisible={setVisible} />
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item
            key="1"
            icon={<AppstoreAddOutlined />}
            onClick={() => setVisible(true)}
          >
            Add Category
          </Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content
          style={{ margin: "24px 16px 0", height: "100%", overflow: "scroll" }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <CategoriesList />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Categories;
