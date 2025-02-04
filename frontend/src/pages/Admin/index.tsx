import "./index.css";
import {
  HomeOutlined,
  SettingOutlined,
  ApartmentOutlined,
  LogoutOutlined,
  UserOutlined,
  ApiOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Breadcrumb, Layout as AntLayout, Menu, theme, Modal, MenuProps } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = AntLayout;
const { confirm } = Modal;
const items1 = [
  {
    label: "settings",
    key: "SubMenu",
    icon: <SettingOutlined />,
    children: [
      {
        label: "Exit",
        key: "exit",
        icon: <LogoutOutlined />,
      },
    ],
  },
];

const items2 = [
  {
    label: "Home",
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "API管理(Admin)",
    key: "role",
    icon: <ApartmentOutlined />,
    children: [
      {
        label: "API管理",
        key: "api-admin",
        icon: <ApiOutlined />,
      },
      {
        label: "API发布",
        key: "user-admin",
        icon: <ApiOutlined />,
      },
    ],
  },
  {
    label: "api管理",
    key: "api",
    icon: <UserOutlined />,
  },
];
const AdminLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectkey, Setselectkey] = useState("home");
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!sessionStorage.getItem("token")) {
  //     navigate("/login");
  //   }
  // }, []);

  const onClick: MenuProps['onClick'] = ({key}) => {
    Setselectkey(key);
    switch (key) {
      case "home":
        navigate("/admin");
        break;
      case "api-admin":
        navigate("/admin/interfaceinfo");
        break;
      case "exit":
        confirm({
          title: "系统消息",
          icon: <ExclamationCircleFilled />,
          content: "确定退出系统?",
          okText: "确定",
          cancelText: "取消",
          onOk() {
            sessionStorage.clear();
            navigate("/login");
          },
        });
        break;
    }
  };

  return (
    <AntLayout className="layout">
      <Header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo">月兔API</div>
        <Menu
          className="menu"
          //   theme="dark"
          mode="horizontal"
          selectedKeys={[selectkey]}
          // defaultSelectedKeys={["2"]}
          items={items1}
          style={{
            // flex: 1,
            minWidth: 0,
          }}
          onClick={onClick}
        />
      </Header>
      <AntLayout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectkey]}
            // defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
            onClick={onClick}
          />
        </Sider>
        <AntLayout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            // items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
          ></Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};
export default AdminLayout;
