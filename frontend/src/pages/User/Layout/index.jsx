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
import { Breadcrumb, Layout, Menu, theme, Modal } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Sider } = Layout;
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
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectkey, Setselectkey] = useState("home");
  const navigate = useNavigate();
  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/");
    // }
  }, []);

  const onClick = ({ key }) => {
    Setselectkey(key);
    switch (key) {
      case "home":
        navigate("/layout");
        break;
      case "api-admin":
        navigate("/layout/apiAdmin");
        break;
      case "exit":
        confirm({
          title: "系统消息",
          icon: <ExclamationCircleFilled />,
          content: "确定退出系统?",
          okText: "确定",
          cancelText: "取消",
          onOk() {
            localStorage.clear();
            navigate("/");
          },
        });
        break;
    }
  };

  return (
    <Layout className="layout">
      <Header
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo">OpenAPI</div>
        <Menu
          className="menu"
          //   theme="dark"
          mode="horizontal"
          selectedKeys={selectkey}
          // defaultSelectedKeys={["2"]}
          items={items1}
          style={{
            // flex: 1,
            minWidth: 0,
          }}
          onClick={onClick}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={selectkey}
            // defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
            onClick={onClick}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
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
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
