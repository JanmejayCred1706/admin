import InputField from '@core/InputField';
import { useNotification } from '@higher-order-components/Notification';
import usePostRequest from '@hooks/usePostRequest';
import { useAppStore } from '@utils/Store';
import { Button, Form, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
import React from 'react';

type ServiceCenterResetPasswordProps = {
  tapData: any;
};
const ServiceCenterResetPassword: React.FC<ServiceCenterResetPasswordProps> = ({
  tapData,
}) => {
  const { setModelOpen } = useAppStore();
  const { showNotification } = useNotification();
  const [form] = useForm();
  const mutation = usePostRequest('admin/reset-password', {}, (data) => {
    showNotification('success', 'Password Changed Successfully');
    setModelOpen(false);
  });
  const handleClose = () => {
    setModelOpen(false);
    form.resetFields();
  };

  const onFinish = (data: any) => {
    const payload = {
      userId: tapData.refId,
      userType: 'serviceCentre',
      ...data,
    };
    mutation.mutate(payload);
  };

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        className="login-form"
        onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <Title level={3}>Reset Password</Title>
        <InputField
          label="Password"
          name="password"
          placeholder="Enter the current password"
          required={true}
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Enter the confirm password"
          required={true}
        />
        <Space>
          <Button onClick={handleClose}>Close</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>
    </>
  );
};

export default ServiceCenterResetPassword;
