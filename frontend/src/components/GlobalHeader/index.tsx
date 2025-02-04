import React from 'react';
import { Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';

const GlobalHeader: React.FC = () => {
  // 顶部导航栏
  const items = [
    {
      key: 'home',
      label: 'Home',
    },
    {
      key: 'about',
      label: 'About',
    }
  ];
  return (
    <>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <a href={"https://github.com/rabitIII"} target="_blank" rel="noopener noreferrer">GitHub</a>
      </Header>
    </>
  )
};

export default GlobalHeader;