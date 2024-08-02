import SelectField from '@components/core/SelectField';
import InputField from '@core/InputField';
import { useNotification } from '@higher-order-components/Notification';
import usePostRequest from '@hooks/usePostRequest';
import { useAppStore } from '@utils/Store';
import { Button, Form, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
import React, { FC } from 'react';

type AddMoneyProps = {
  selectedId: string;
};

const AddMoney: FC<AddMoneyProps> = ({ selectedId }) => {
  const { setModelOpen } = useAppStore();
  const { showNotification } = useNotification();
  const [form] = useForm();
  const mutation = usePostRequest(
    `franchise/add-money/${selectedId}`,
    {},
    (data) => {
      showNotification('success', 'Password Changed Successfully');
      setModelOpen(false);
    }
  );
  const handleClose = () => {
    setModelOpen(false);
    form.resetFields();
  };

  const onFinish = (data: any) => {
    console.log(data, '...');
    mutation.mutate(data);
    form.resetFields();
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
        <Title level={3}>Add Money</Title>
        <InputField
          label="Transaction Id"
          name="amount"
          placeholder="Enter the amount"
          required={true}
          type="num"
        />
        <SelectField
          label="Select Payment Mode"
          name="payment_mode"
          placeholder="Select the payment mode"
          required={true}
          selectArr={['NEFT/ RTGS/ IMPS', 'Cheque', 'Upi', 'Other']}
        />
        <InputField
          label="Transaction Id"
          name="transaction_id"
          placeholder="Enter the transaction id"
          required={true}
        />
        <InputField
          label="Payment Source"
          name="payment_source"
          placeholder="Enter the payment source"
          required={true}
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

export default AddMoney;
