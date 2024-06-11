'use client';
import { InputField } from '@components/Component';
import { LoginFormProps } from '@login/LoginInterface';
import { Form } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { FC } from 'react';

const LoginForm: FC<LoginFormProps> = () => {
  const onFinish = () => {};
  return (
    <div className="h-[40rem] w-[40rem] bg-priWhite display-center mt-[-20rem] rounded-2xl">
      <p className="text-priLightGrey text-2xl font-bold">Sign in to Admin</p>
      <Form
        layout="vertical"
        size="large"
        onFinish={onFinish}
        className="w-full"
      >
        <InputField label="Email" name="email" />
      </Form>
    </div>
  );
};
export default LoginForm;
