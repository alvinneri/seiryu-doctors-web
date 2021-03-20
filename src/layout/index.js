import React from "react";
import { SideNavigation } from "../components/Navigation";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Layout } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const LayoutWrapper = ({ children }) => {
  return (
    <Layout style={{ height: "100vh" }}>
      <SideNavigation />
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, height: "100%" }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Betting ©2021</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
