'use client';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import usePostRequest from 'src/hooks/usePostRequest';
import { addCookies } from '@utils/cookies';
import { useNotification } from '@components/higher-order-components/Notification';

const LoginForm: FC = () => {
  const { showNotification } = useNotification();
  const router = useRouter();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mutation = usePostRequest('user/login', {}, (data) => {
    showNotification('success', 'User Login Successfully');
    if (data?.data?.token) {
      addCookies(['token'], [data.data.token]);
    }
    if (data?.success) {
      router.push('/admin/dashboard');
    }
  });

  const onFinish = async (formData: any) => {
    const payload = {
      user_type: 'admin',
      grant_type: 'password',
      ...formData,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="h-[35rem] w-[35rem] bg-priWhite display-center mt-[-10%] rounded-2xl flex-col relative">
      <p className="text-priLightGrey text-2xl font-bold absolute top-10">
        Sign in to Admin
      </p>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        className="login-form"
        style={{ padding: '4rem', borderTop: '1px solid #efefef' }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { pattern: emailPattern, message: 'Enter a valid email format' },
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
          rules={[{ required: true, message: 'Please input your password!' }]}
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
              cursor: 'pointer',
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
