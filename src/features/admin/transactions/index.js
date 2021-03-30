import React, { useState } from "react";
import MyTransactionsList from "./MyTransactionsList";
import AllTransactionsList from "./AllTransactionsList";
import { Layout, Menu, Modal, Tabs } from "antd";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const Transactions = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="All Loader Transactions" key="1">
        <AllTransactionsList />
      </TabPane>
      <TabPane tab="My Transactions" key="2">
        <MyTransactionsList />
      </TabPane>
    </Tabs>
  );
};

export default Transactions;
