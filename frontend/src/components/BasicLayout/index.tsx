import { Layout, Menu, theme } from 'antd';
import './index.css';
import GlobalHeader from '../GlobalHeader';
const { Header, Content, Footer } = Layout;


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
const Welcome = () => {
  return (
    <Layout id="WelcomePage" style={{ minHeight: '100vh' }}>
      <div className="header">
        <GlobalHeader />
      </div>
      <Content
        className="content"
        style={{
          marginBottom: '28px',
          padding: '20px',
        }}
      >
          Content
      </Content>

      {/* 底部 */}
      <Footer
        style={{
          backgroundColor: '#efefef',
          padding: '16px',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default Welcome;
