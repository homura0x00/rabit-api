import "./index.css";
import {
  HomeOutlined,
  SettingOutlined,
  ApartmentOutlined,
  LogoutOutlined,
  UserOutlined,
  ApiOutlined,
  ExclamationCircleFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout as AntLayout, Menu, theme, MenuProps, Modal } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import LogoView from "../../components/Logo";
const { Header, Content, Sider } = AntLayout;

type MenuItem = Required<MenuProps>['items'][number];

const topItems: MenuItem[] = [
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

const items2: MenuItem[] = [
  {
    label: 'Home',
    key: '/admin',
    icon: <HomeOutlined />,
  },
  {
    label: '接口管理',
    key: 'role',
    icon: <ApartmentOutlined />,
    children: [
      {
        label: '接口管理',
        key: '/admin/interfaceinfo',
        icon: <ApiOutlined />,
      },
      {
        label: '接口分析',
        key: '/admin/interface',
        icon: <ApiOutlined />,
      },
    ],
  },
  {
    label: '用户管理',
    key: '/admin/userinfo',
    icon: <UserOutlined />,
  },
];
const AdminLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // if (!sessionStorage.getItem("token")) {
    //   navigate("/login");
    // }
  }, []);

  const onSetting: MenuProps['onClick'] = ({key}) => {
    if (key === 'exit') {
      Modal.confirm({
        title: '退出系统',
        icon: <ExclamationCircleOutlined />,
        content: '该操作不可逆,是否确认退出!',
        okText: '确认',
        cancelText: '取消',
        onOk: () => (navigate('/login'))
      });
    }
  }


  const onClick: MenuProps['onClick'] = ({key}) => {
    navigate(key);
  }

const selectedKeys = location.pathname;

  return (
    <AntLayout id="AntLayoutPage">
      <Header
        className="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          border: 0,
        }}
      >
        <LogoView />
        <Menu
          className="menu"
          //   theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKeys]}
          // defaultSelectedKeys={["2"]}
          items={topItems}
          style={{
            right: 0,
            minWidth: 0,
            border: 0,
          }}
          onClick={onSetting}
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
            selectedKeys={[selectedKeys]}
            // defaultOpenKeys={["sub1"]}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
            onClick={onClick}
          />
        </Sider>
        <AntLayout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
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
