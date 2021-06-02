import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  DatabaseOutlined,
  HomeOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserOutlined,
  MoneyCollectFilled,
  DollarOutlined,
  ApartmentOutlined,
  AuditOutlined,
  BankOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../../store/public/actions";
import { auth } from "../../firebase/config";
import { USER_TYPES } from "../../app/common/constants/usertypes";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const SideNavigation = () => {
  const { user } = useSelector((state) => state.public);
  const [menuItems, setMenuItems] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const getDrawerItems = () => {
    if (user) {
      if (user.userType === USER_TYPES.ADMIN) {
        setMenuItems([
          {
            name: "HOME",
            icon: <HomeOutlined />,
            path: "/home",
          },
          {
            name: "LIST OF DOCTORS",
            icon: <HomeOutlined />,
            path: "/doctors",
          },
        ]);
      }
    } else {
      setMenuItems([
        {
          name: "LOGIN",
          icon: <LoginOutlined />,
          path: "/",
        },
      ]);
    }
  };

  useEffect(() => {
    getDrawerItems();
  }, [user]);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />`{" "}
      <Menu theme="dark" mode="inline">
        {menuItems.map((route, index) => {
          return (
            <Menu.Item
              key={index}
              icon={route.icon}
              onClick={() => {
                if (route.name === "LOG OUT") {
                  auth.signOut().then(() => {
                    dispatch(setUser(null));
                  });
                }

                history.push(route.path);
              }}
            >
              {route.name}
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};
