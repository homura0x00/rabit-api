import { Modal, Form, Input, Select } from "antd";
import React  from 'react';
const { TextArea } = Input;
const CreateModal: React.FC = (props) => {
  // eslint-disable-next-line react/prop-types
  const { open, onCancel, onSubmit } = props;
  const [form] = Form.useForm();
  return (
    <Modal
      title="上传接口"
      width={650}
      open={open}
      onCancel={() => onCancel?.()}
      afterClose={() => {
        form.resetFields();
      }}
      cancelText="取消"
      okText="创建"
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onSubmit(values);
        });
      }}
    >
      <Form
        form={form}
        onFinish={async (value) => {
          onSubmit?.(value);
        }}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{ maxWidth: "600px" }}
      >
        <Form.Item name="title" label="接口名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="method" label="请求方法">
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: "GET",
                label: "GET",
              },
              {
                value: "POST",
                label: "POST",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="url" label="url">
          <Input />
        </Form.Item>
        <Form.Item name="requestHeader" label="请求头">
          <Input />
        </Form.Item>
        <Form.Item name="responseHeader" label="响应头">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
