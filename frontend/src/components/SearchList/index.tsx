import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Space} from "antd";
const AdvancedSearchForm = () => {

  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      form={form}
      name="advanced_search"

      onFinish={onFinish}
    >
      <Row>
        <Col>
            <Form.Item
              name='name'
              label='接口名称'
              rules={[
                {
                  required: true,
                  message: "Input something!",
                },
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          </Col>
      </Row>
      <div
        style={{
          textAlign: "right",
        }}
      >
        <Space size="small">
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            取消
          </Button>
          <a
            style={{
              fontSize: 12,
            }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
          </a>
        </Space>
      </div>
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
