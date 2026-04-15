import {Modal, Form, Input, Select} from "antd";
import { useEffect, useRef } from "react";
const { TextArea } = Input;
const UpdateModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { values, visible, onCancel, onSubmit } = props;
  const [form] = Form.useForm();

  const formRef = useRef();

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);
  return (
    <Modal
      title="修改接口"
      width={650}
      open={visible}
      onCancel={() => onCancel?.()}
      // afterClose={() => {
      //   form.resetFields();
      // }}
      cancelText="取消"
      okText="修改"
      onOk={() => {
        form.validateFields().then((values) => {
          onSubmit(values);
          console.log(values);
        });
      }}
      destroyOnClose={true}
    >
      <Form
        form={form}
        initialValues={{
          ...values,
        }}
        preserve={false}
        onFinish={(values) => {
          onSubmit?.(values)
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
        <Form.Item name="description" label="描述">
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

export default UpdateModal;
