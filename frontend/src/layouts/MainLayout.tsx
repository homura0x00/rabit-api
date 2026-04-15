import React, { useState } from 'react';
import {
  Layout,
  Button,
  Typography,
  Input,
  Switch,
  Drawer,
  Modal,
} from 'antd';
import {
  ApiOutlined,
  SearchOutlined,
  GithubOutlined,
  MoonOutlined,
  SunOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useThemeStore } from '@/stores/themeStore';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { key: '1', label: '首页', onClick: () => { navigate('/'); setIsMenuOpen(false); } },
    { key: '2', label: '接口市场', onClick: () => setIsMenuOpen(false) },
    { key: '3', label: '开发文档', onClick: () => setIsMenuOpen(false) },
  ];

  return (
    <Layout className="min-h-screen min-w-[375px]">
      {/* 导航栏 */}
      <Header
        className={`fixed top-0 left-0 z-50 w-full px-4 sm:px-6 backdrop-blur-md border-b h-16 ${
          theme === 'dark' 
            ? 'bg-gray-900/80! border-gray-800!' 
            : 'bg-white/80! border-gray-100!'
        }`}
      >
        <div className="max-w-[1536px] mx-auto h-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-8 shrink-0">
            <div
              className="flex items-center gap-2 cursor-pointer shrink-0"
              onClick={() => navigate('/')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <ApiOutlined className="text-white text-lg" />
              </div>
              <span className={`hidden lg:inline text-xl font-bold bg-clip-text text-transparent whitespace-nowrap shrink-0 ${theme === 'dark' ? 'bg-linear-to-r from-blue-400 to-indigo-400' : 'bg-linear-to-r from-blue-600 to-indigo-600'}`}>
                Rabit API
              </span>
            </div>

            {/* 桌面端导航 */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map(item => (
                <Button 
                  key={item.key} 
                  type="text" 
                  onClick={item.onClick}
                  className={`px-2 font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white!' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* 搜索按钮 - 纯图标风格 */}
            <Button
              type="text"
              icon={<SearchOutlined />}
              onClick={() => setIsSearchOpen(true)}
              className={`flex items-center justify-center rounded-lg w-10 h-10 ${
                theme === 'dark' ? 'text-gray-400 hover:bg-gray-800!' : 'text-gray-500 hover:bg-gray-100'
              }`}
            />

            <div className="hidden lg:flex items-center">
              <Switch
                checked={theme === 'dark'}
                onChange={toggleTheme}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
              />
            </div>

              <div className="hidden lg:flex items-center">
                <Button
                  type="primary"
                  className="rounded-full px-6 font-medium shrink-0"
                  onClick={() => navigate('/auth/register')}
                >
                  立即加入
                </Button>
              </div>

            {/* 移动端菜单按钮 */}
            <div className='lg:hidden flex items-center justify-center'>
              <Button
                type="text"
                icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                className="text-lg w-10 h-10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </div>
      </Header>

      {/* 移动端抽屉菜单 */}
      <Drawer
        placement="bottom"
        onClose={() => setIsMenuOpen(false)}
        open={isMenuOpen}
        closable={false}
        styles={{ 
          body: { padding: '24px 16px' } 
        }}
        className={theme === 'dark' ? 'dark-drawer' : ''}
      >
        <div className="flex flex-col gap-4 mt-10">
          {navItems.map(item => (
            <Button 
              key={item.key} 
              type="text" 
              onClick={item.onClick}
              className={`w-full text-left text-lg h-12 flex items-center px-4 rounded-xl ${
                theme === 'dark' ? 'text-gray-300 hover:bg-gray-800!' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Button>
          ))}
          <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
          
          <div className="flex items-center justify-between px-4 mb-4">
            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>深色模式</span>
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
          </div>

          <div className="px-4">
            <Button
              type="primary"
              size="large"
              block
              className="rounded-xl font-bold h-12"
              onClick={() => { navigate('/auth/register'); setIsMenuOpen(false); }}
            >
              立即加入
            </Button>
          </div>
        </div>
      </Drawer>

      {/* 搜索中心 - 居中简约 Modal (Command Palette 风格) */}
      <Modal
        open={isSearchOpen}
        onCancel={() => setIsSearchOpen(false)}
        footer={null}
        closable={true}
        width={720}
        centered
        title={
          <div className="flex items-center gap-2 py-2">
            <SearchOutlined className="text-blue-600" />
            <span className={`text-base font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>搜索中心</span>
          </div>
        }
        styles={{ 
          mask: {
            backdropFilter: 'blur(8px)',
            backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          },
          body: {
            padding: '24px 32px 32px',
            background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          }
        }}
        className="openai-style-modal"
      >
        <div className="flex flex-col gap-8">
          {/* 搜索框区域 */}
          <div className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
            theme === 'dark' 
              ? 'bg-gray-900 border-gray-800 focus-within:border-blue-900' 
              : 'bg-gray-50 border-gray-100 focus-within:border-blue-100 focus-within:bg-white shadow-sm'
          }`}>
            <SearchOutlined className="text-2xl text-gray-400 shrink-0" />
            <Input 
              placeholder="搜索接口、文档、指南..." 
              variant="borderless" 
              autoFocus
              className="text-xl p-0 h-10 flex-1 dark:text-white placeholder:text-gray-500 font-medium"
            />
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-gray-200/50 dark:bg-gray-800 text-[10px] text-gray-500 font-bold font-mono">
              ENTER
            </div>
          </div>

          {/* 推荐/最近搜索 */}
          <div className="flex flex-col gap-6">
            <div>
              <Text strong className={`text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                最近搜索
              </Text>
              <div className="mt-4 flex flex-wrap gap-3">
                {['天气查询', '智能对话', '快递追踪'].map(tag => (
                  <Button 
                    key={tag} 
                    size="small" 
                    className={`rounded-full px-4 h-8 border ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-700 text-gray-300 hover:text-blue-400! hover:border-blue-900!' 
                        : 'bg-white border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-400 shadow-xs'
                    }`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Text strong className={`text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                快速链接
              </Text>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: '查看所有 API', desc: '浏览我们的接口市场', icon: <ApiOutlined /> },
                  { title: '开发文档', desc: '学习如何快速集成', icon: <GithubOutlined /> }
                ].map((link, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 group ${
                      theme === 'dark' 
                        ? 'bg-gray-800/50 border-gray-800 hover:bg-gray-800 hover:border-gray-700' 
                        : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-blue-100 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-colors ${
                      theme === 'dark' ? 'bg-gray-900 text-gray-400 group-hover:text-blue-400' : 'bg-white text-gray-400 group-hover:text-blue-600'
                    }`}>
                      {link.icon}
                    </div>
                    <div>
                      <div className={`font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{link.title}</div>
                      <div className="text-xs text-gray-500">{link.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 底部提示 */}
          <div className="pt-4 border-t dark:border-gray-800 flex items-center justify-center">
            <Text className="text-[11px] text-gray-400 flex items-center gap-2">
              <span>使用</span>
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 font-mono">↑↓</kbd>
              <span>选择，</span>
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 font-mono">ESC</kbd>
              <span>关闭</span>
            </Text>
          </div>
        </div>
      </Modal>

      <Content className="bg-transparent pt-16">
        <div className="max-w-[1536px] mx-auto">
          <Outlet />
        </div>
      </Content>

      <Footer className={`py-16 px-4 sm:px-6 border-t ${theme === 'dark' ? 'bg-black/40 border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
        <div className="max-w-[1536px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                  <ApiOutlined className="text-white text-xs" />
                </div>
                <span className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : ''}`}>Rabit API</span>
              </div>
              <Text type="secondary" className={`text-xs ${theme === 'dark' ? 'text-gray-400!' : ''}`}>
                © 2026 Rabit API. All rights reserved.
              </Text>
            </div>

            <div className="flex gap-12">
              <div className="flex flex-col gap-3">
                <Text strong className={`mb-2 ${theme === 'dark' ? 'text-gray-200!' : ''}`}>
                  产品
                </Text>
                <Link href="#" theme={theme}>接口市场</Link>
                <Link href="#" theme={theme}>开发文档</Link>
              </div>
              <div className="flex flex-col gap-3">
                <Text strong className={`mb-2 ${theme === 'dark' ? 'text-gray-200!' : ''}`}>
                  支持
                </Text>
                <Link href="#" theme={theme}>更新日志</Link>
                <Link href="#" theme={theme}>反馈建议</Link>
              </div>
            </div>

            <div className={`flex gap-4 text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
              <GithubOutlined className={`hover:text-gray-900 cursor-pointer transition-colors ${theme === 'dark' ? 'hover:text-gray-300!' : ''}`} />
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

// 辅助链接组件
const Link: React.FC<{ href: string; children: React.ReactNode; theme?: 'light' | 'dark' }> = ({
  href,
  children,
  theme = 'light',
}) => (
  <a
    href={href}
    className={`text-sm transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-blue-400!' : 'text-gray-500 hover:text-blue-600'}`}
  >
    {children}
  </a>
);

export default MainLayout;
