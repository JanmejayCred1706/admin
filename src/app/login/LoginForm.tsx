'use client';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { FormDataInterface, LoginFormProps } from '@login/LoginInterface';
import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import fetchInstance from 'src/utils/fetchInstance';

const LoginForm: FC<LoginFormProps> = () => {
  const emailPattern = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  const onFinish: (data: FormDataInterface) => void = async (data) => {
    console.log(data, 'data');
    try {
      const data = await fetchInstance('user/login', {
        method: 'GET', // or 'POST', 'PUT', etc.
      });
      console.log('Data', data);
    } catch (error) {
      console.error('data', error);
    }
  };
  return (
    <div className="h-[35rem] w-[35rem] bg-priWhite display-center mt-[-10%] rounded-2xl flex-col relative">
      <p className="text-priLightGrey text-2xl font-bold absolute top-10">
        Sign in to Admin
      </p>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        className="login-form"
        style={{ padding: '4rem', borderTop: '1px solid #efefef' }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            // {
            //   pattern: emailPattern,
            //   message: 'Enter the valid format',
            // },
          ]}
          style={{ marginBottom: '2rem' }}
        >
          <Input
            addonBefore={<MailOutlined />}
            placeholder="Email"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password
            addonBefore={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item className="display-center">
          <Button
            htmlType="submit"
            size="large"
            style={{
              backgroundColor: '#DA5D59',
              color: '#fff',
              padding: '1.4rem',
            }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginForm;
