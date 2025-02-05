import { Layout } from 'antd';
import './index.css';
import GlobalHeader from '../GlobalHeader';
const { Content, Footer } = Layout;


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
        月兔API ©{new Date().getFullYear()} Created by rabitIII
      </Footer>
    </Layout>
  );
};
export default Welcome;
