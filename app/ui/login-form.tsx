'use client';
import SForm, { FormItemType } from '@/app/ui/s-component/s-form';
import { Input } from 'antd';
import Password from 'antd/lib/input/Password';
import { signIn } from 'next-auth/react';

type FieldType = {
  email?: string;
  password?: string;
};

const items: FormItemType[] = [
  {
    name: 'email',
    label: '邮箱',
    component: Input,
    rules: [
      {
        required: true,
        type: 'email',
        message: 'The input is not valid E-mail!',
      },
    ],
  },
  {
    name: 'password',
    label: '密码',
    component: Password,
    rules: [{ required: true, message: 'Please input your password!' }],
  },
];

export default function LoginForm() {
  async function handleOnFinish(value: FieldType) {
    await signIn('credentials', value);
  }

  return (
    <div className={'rounded-xl border p-5'}>
      <SForm<FieldType> formItems={items} onFinish={handleOnFinish} />
    </div>
  );
}
