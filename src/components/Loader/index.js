import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />;

const Loader = () => {
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Content>
          <div
            className="site-layout-background"
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1a1a1d",
            }}
          >
            <Spin indicator={antIcon} />
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Loader;
