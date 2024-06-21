'use client';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { postData } from '@api/layoutApi';
import {
  FormDataInterface,
  LoginFormProps,
  loginPayloadInterface,
} from '@login/LoginInterface';
import { addCookies } from '@utils/cookies';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useAppStore } from 'src/utils/Store';

interface AppState {
  bears: string;
  // Add other properties as needed
}
const LoginForm: FC<LoginFormProps> = () => {
  const router = useRouter();
  const { cart } = useAppStore();

  const emailPattern = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  const onFinish: (data: FormDataInterface) => void = async (formData) => {
    try {
      const payload: loginPayloadInterface = {
        user_type: 'admin',
        grant_type: 'password',
        ...formData,
      };
      const response = await postData(payload);
      localStorage.setItem('token', response?.data?.token);
      addCookies(['token'], [response?.data?.token]);
      console.log(response?.success, '..');
      if (response?.success) {
        router.push('/');
      }
    } catch (err) {
      console.log('error :', err);
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
