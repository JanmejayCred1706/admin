'use client';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { FormDataInterface, LoginFormProps } from '@login/LoginInterface';
import { Button, Form, Input } from 'antd';
import { FC } from 'react';

const LoginForm: FC<LoginFormProps> = () => {
  const emailPattern = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  const onFinish: (data: FormDataInterface) => void = async (formData) => {
    console.log('...');
    const payload = {
      email: 'admin@garantie.in',
      grant_type: 'password',
      password: 'Garantie@1',
      user_type: 'admin',
    };
    try {
      const response = await fetch('https://qa.garantie.in//api/user/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result, 'result');
      // setData(result);
    } catch (err) {
      // setError((err as Error).message);
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
              // required: true,
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
              // required: true,
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
