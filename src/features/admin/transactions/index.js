import React, { useState } from "react";
import TransactionsList from "./TransactionsList";
import { Layout, Menu, Modal } from "antd";

const { Header, Content } = Layout;

const Transactions = () => {
  return <TransactionsList />;
};

export default Transactions;
