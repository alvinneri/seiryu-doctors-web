import React, { useState } from "react";
import TransactionsList from "./TransactionsList";
import { Layout, Menu, Modal } from "antd";

const { Header, Content } = Layout;

const Categories = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <Layout>
        <Content
          style={{ margin: "24px 16px 0", height: "100%", overflow: "scroll" }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <TransactionsList />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Categories;
