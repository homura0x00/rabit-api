import {Modal, Form, message, Input, Select, GetProp, UploadProps } from "antd";
import { useEffect, useRef } from "react";
import UserAvatarEditer from '../../../../components/UserAvatarEditer'
const UpdateModal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { values, visible, onCancel, onSubmit } = props;
  const [form] = Form.useForm();

  const formRef = useRef();

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
  // 格式校验
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);
  return (
    <Modal
      title="修改用户信息"
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
        <Form.Item  name="userAccount" label="用户账户" rules={[{ required: true }]}>
          <Input disabled /> 
        </Form.Item>
        <Form.Item name="userName" label="用户名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="userAvatar" label="用户头像">
          <UserAvatarEditer beforeUpload={beforeUpload} />
        </Form.Item>
        <Form.Item name="userRole" label="角色" rules={[{ required: true }]}>
          <Select
            style={{
              width: 120,
            }}
            options={[
              {
                value: "user",
                label: "普通用户",
              },
              {
                value: "admin",
                label: "管理员",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
