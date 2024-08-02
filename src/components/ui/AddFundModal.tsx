import InputField from '@components/core/InputField';
import SelectField from '@components/core/SelectField';
import { useNotification } from '@components/higher-order-components/Notification';
import usePostRequest from '@hooks/usePostRequest';
import { useAppStore } from '@utils/Store';
import { Button, Form, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
import React from 'react';

type Props = {};

const AddFundModal = (props: Props) => {
  const { setModelOpen } = useAppStore();
  const { showNotification } = useNotification();
  const [form] = useForm();
  //   const mutation = usePostRequest(`franchise/add-money`, {}, (data) => {
  //     showNotification('success', 'Password Changed Successfully');
  //     setModelOpen(false);
  //   });
  const handleClose = () => {
    setModelOpen(false);
    form.resetFields();
  };

  const onFinish = (data: any) => {
    // mutation.mutate(data);
    // form.resetFields();
  };
  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        className="login-form"
        onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <Title level={3}>Add Fund</Title>
        <InputField
          label="Amount"
          name="amount"
          placeholder="Enter the amount"
          required={true}
          type="num"
        />
        <Space>
          <Button onClick={handleClose}>Close</Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default AddFundModal;
