import * as React from 'react'
import {
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Badge,
} from 'antd';
import {
  ApiOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { useThemeStore } from '@/stores/themeStore';

const { Title, Paragraph, Text } = Typography;

const HomePage: React.FC = () => {
  const { theme } = useThemeStore();
   // 模拟一些热门 API 数据
  const popularApis = [
    {
      title: '天气查询',
      description: '提供全球城市实时天气及预报数据',
      category: '生活服务',
      color: 'blue',
    },
    {
      title: '智能对话',
      description: '基于最新大模型的自然语言处理接口',
      category: '人工智能',
      color: 'purple',
    },
    {
      title: '快递查询',
      description: '支持国内外主流快递公司运单追踪',
      category: '工具服务',
      color: 'green',
    },
    {
      title: '股票行情',
      description: '实时股票价格及历史交易数据分析',
      category: '金融理财',
      color: 'red',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className={`relative py-32 px-6 overflow-hidden ${theme === 'dark' ? 'bg-linear-to-b from-blue-950/20 to-gray-900' : 'bg-linear-to-b from-blue-50/50 to-white'}`}>
          <div className="max-w-[1536px] mx-auto text-center relative z-10">
            <Badge
              count="v1.0.0 Now Available"
              className="mb-6"
              style={{
                backgroundColor: theme === 'dark' ? '#111a2c' : '#e6f4ff',
                color: theme === 'dark' ? '#1677ff' : '#0958d9',
                borderColor: theme === 'dark' ? '#153450' : '#91caff',
              }}
            />
            <Title className="text-5xl! md:text-6xl! font-extrabold! mb-6 leading-tight!">
              让 <span className="text-blue-600">API</span> 调用变得
              <br />
              简单、可靠、高效
            </Title>
            <Paragraph className={`text-lg md:text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} max-w-2xl mx-auto mb-10 leading-relaxed`}>
              Rabit API 是一个专业的 API
              开放管理平台，为开发者提供丰富、稳定、低成本的接口服务。
              一站式解决接口发现、调用测试、监控统计等全流程需求。
            </Paragraph>
            <Space size="middle" className="flex justify-center">
              <Button
                type="primary"
                size="large"
                className="h-12 px-10 rounded-full text-lg shadow-lg shadow-blue-200"
              >
                浏览接口市场
              </Button>
              <Button
                size="large"
                icon={<GithubOutlined />}
                className="h-12 px-8 rounded-full text-lg"
              >
                查看源码
              </Button>
            </Space>

            {/* 装饰性元素 */}
            <div className="mt-16 relative">
              <div className={`absolute -top-10 -left-10 w-40 h-40 ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100'} rounded-full blur-3xl opacity-50`} />
              <div className={`absolute -bottom-10 -right-10 w-60 h-60 ${theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-100'} rounded-full blur-3xl opacity-50`} />
              <div className={`p-4 rounded-2xl shadow-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} max-w-4xl mx-auto overflow-hidden`}>
                <div className={`flex items-center gap-2 mb-4 px-2 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-50'} pb-3`}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} font-mono ml-4`}>
                    GET /api/v1/interface/list
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 text-left font-mono text-sm text-blue-400 overflow-x-auto">
                  <pre className="m-0 leading-relaxed">
                    {`{
  "code": 0,
  "data": {
    "list": [
      { "id": 1, "name": "天气查询", "status": "Online" },
      { "id": 2, "name": "智能对话", "status": "Online" }
    ],
    "total": 128
  },
  "message": "success"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 热门接口展示 */}
        <section className={`py-32 px-6 border-y ${theme === 'dark' ? 'bg-gray-800/40 border-gray-800' : 'bg-gray-100/50 border-gray-200/50'}`}>
          <div className="max-w-[1536px] mx-auto">
            <div className="flex justify-between items-end mb-12 px-6 border-l-4 border-blue-600!">
              <div>
                <Title level={2} className="mb-2!">
                  热门接口
                </Title>
                <Paragraph className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} mb-0 text-lg`}>
                  最受开发者欢迎的精选接口
                </Paragraph>
              </div>
              <Button type="link" className="text-blue-600 font-bold text-lg hover:translate-x-1 transition-transform">
                查看更多 &rarr;
              </Button>
            </div>

            <Row gutter={[32, 32]}>
              {popularApis.map((api, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card
                    hoverable
                    className={`h-full ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-white shadow-sm'} hover:border-blue-200 transition-all hover:shadow-2xl hover:-translate-y-2 rounded-3xl overflow-hidden`}
                    cover={
                      <div
                        className={`h-40 flex items-center justify-center ${theme === 'dark' ? `bg-${api.color}-900/10` : `bg-${api.color}-50/40`} transition-colors`}
                      >
                        <ApiOutlined
                          className={`text-6xl ${theme === 'dark' ? `text-${api.color}-400` : `text-${api.color}-500`}`}
                        />
                      </div>
                    }
                  >
                    <Card.Meta
                      title={
                        <span className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{api.title}</span>
                      }
                      description={
                        <div className="flex flex-col gap-4">
                          <Text
                            className={`text-sm line-clamp-2 min-h-[40px] leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                          >
                            {api.description}
                          </Text>
                          <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <Badge
                              status="processing"
                              text={api.category}
                              className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}
                            />
                            <div className="px-2 py-0.5 rounded bg-blue-600/10 text-blue-600 text-[10px] font-bold uppercase tracking-tighter">
                              Free Tier
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* 特性展示 */}
        <section className={`py-32 px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-[1536px] mx-auto">
            <div className="text-center mb-24">
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-600 text-xs font-black tracking-widest uppercase mb-6 shadow-sm shadow-blue-100">
                Core Features
              </div>
              <Title level={2} className="text-4xl! font-bold!">为什么选择 Rabit API?</Title>
              <Paragraph className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xl max-w-2xl mx-auto mt-4`}>
                我们致力于打造最极致的开发者体验，每一个细节都经过精心打磨。
              </Paragraph>
            </div>

            <Row gutter={[80, 80]}>
              <Col xs={24} md={8}>
                <div className="flex flex-col items-center text-center group">
                  <div className={`w-24 h-24 ${theme === 'dark' ? 'bg-blue-900/30 group-hover:bg-blue-600/30' : 'bg-blue-50 group-hover:bg-blue-100'} rounded-4xl flex items-center justify-center mb-8 transition-all duration-300 transform group-hover:rotate-6 group-hover:scale-110 shadow-sm`}>
                    <ThunderboltOutlined className="text-5xl text-blue-600" />
                  </div>
                  <Title level={4} className="text-2xl! mb-4!">极速响应</Title>
                  <Paragraph className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-lg leading-relaxed`}>
                    分布式架构部署，全球加速，确保每一次 API
                    调用都在毫秒级完成。
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="flex flex-col items-center text-center group">
                  <div className={`w-24 h-24 ${theme === 'dark' ? 'bg-green-900/30 group-hover:bg-green-600/30' : 'bg-green-50 group-hover:bg-green-100'} rounded-4xl flex items-center justify-center mb-8 transition-all duration-300 transform group-hover:rotate-6 group-hover:scale-110 shadow-sm`}>
                    <SafetyCertificateOutlined className="text-5xl text-green-600" />
                  </div>
                  <Title level={4} className="text-2xl! mb-4!">安全可靠</Title>
                  <Paragraph className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-lg leading-relaxed`}>
                    严格的权限管控与流量监控，多重安全防御机制，保障您的接口调用万无一失。
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <div className="flex flex-col items-center text-center group">
                  <div className={`w-24 h-24 ${theme === 'dark' ? 'bg-purple-900/30 group-hover:bg-purple-600/30' : 'bg-purple-50 group-hover:bg-purple-100'} rounded-4xl flex items-center justify-center mb-8 transition-all duration-300 transform group-hover:rotate-6 group-hover:scale-110 shadow-sm`}>
                    <RocketOutlined className="text-5xl text-purple-600" />
                  </div>
                  <Title level={4} className="text-2xl! mb-4!">开箱即用</Title>
                  <Paragraph className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-lg leading-relaxed`}>
                    完善的在线测试工具与多语言 SDK，最快 1
                    分钟即可完成接口集成。
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-40 px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto bg-linear-to-br from-blue-600 via-blue-700 to-indigo-900 rounded-3xl p-16 md:p-32 text-center text-white relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(37,99,235,0.4)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/20 rounded-full -ml-40 -mb-40 blur-3xl" />

            <Title className="text-white! text-4xl! md:text-5xl! mb-8 tracking-tight">
              准备好开启您的 API 之旅了吗？
            </Title>
            <Paragraph className="text-blue-100 text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
              立即注册账号，体验免费接口额度，与全球开发者共同探索无限可能。
            </Paragraph>
            <Button
              size="large"
              className="h-16 px-16 rounded-full font-bold text-lg text-blue-600 border-none hover:text-blue-700! hover:scale-105 transition-all shadow-xl"
            >
              免费注册
            </Button>
          </div>
        </section>
    </div>
  )
}

export default HomePage