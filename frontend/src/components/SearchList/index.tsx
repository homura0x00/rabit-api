import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space } from 'antd';

const { Option } = Select;

const AdvancedSearchForm = () => {
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <Form form={form} name="advanced_search" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item name="name" label="接口名称">
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="method" label="method" initialValue="GET">
            <Select>
              <Option value="GET">GET</Option>
              <Option value="POST">POST</Option>
              <Option value="PUT">PUT</Option>
              <Option value="DELETE">DELETE</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="url" label="URL">
            <Input placeholder="placeholder" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <div
            style={{

              textAlign: 'right',
            }}
          >
            <Space size="small">
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                }}
              >
                Clear
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
      {/* <div
        style={{
          textAlign: 'right',
        }}
      >
        
      </div> */}
    </Form>
  );
};
const SearchList: React.FC = () => {
  return (
    <>
      <AdvancedSearchForm />
    </>
  );
};
export default SearchList;
