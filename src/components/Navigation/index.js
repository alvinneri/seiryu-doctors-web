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
            path: "/",
          },
          {
            name: "CATEGORIES",
            icon: <DatabaseOutlined />,
            path: "/categories",
          },
          {
            name: "USERS",
            icon: <UserOutlined />,
            path: "/users",
          },
          {
            name: "MANAGE MATCHES",
            icon: <ApartmentOutlined />,
            path: "/manage-matches",
          },
          {
            name: "MANAGE BANKS",
            icon: <BankOutlined />,
            path: "/manage-banks",
          },
          {
            name: "MANAGE GCASH",
            icon: <DollarOutlined />,
            path: "/manage-gcash",
          },
          {
            name: "GCASH",
            icon: <MoneyCollectFilled />,
            path: "/gcash",
          },
          {
            name: "BANK",
            icon: <MoneyCollectFilled />,
            path: "/banks",
          },
          {
            name: "MY TRANSACTIONS",
            icon: <AuditOutlined />,
            path: "/my-transactions",
          },
          {
            name: "LOG OUT",
            icon: <LogoutOutlined />,
            path: "/",
          },
        ]);
      } else if (user.userType === USER_TYPES.LOADER) {
        setMenuItems([
          {
            name: "HOME",
            icon: <HomeOutlined />,
            path: "/",
          },
          {
            name: "GCASH",
            icon: <MoneyCollectFilled />,
            path: "/gcash",
          },
          {
            name: "BANK",
            icon: <MoneyCollectFilled />,
            path: "/banks",
          },
          {
            name: "MY TRANSACTIONS",
            icon: <AuditOutlined />,
            path: "/my-transactions",
          },
          {
            name: "LOG OUT",
            icon: <LogoutOutlined />,
            path: "/",
          },
        ]);
      } else {
        setMenuItems([
          {
            name: "LOGIN",
            icon: <LoginOutlined />,
            path: "/",
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
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
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
