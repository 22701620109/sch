'use client';
import { Button } from 'antd';
import { signIn } from 'next-auth/react';

export default function SignInBtn() {
  return (
    <Button onClick={() => signIn()} type={'primary'}>
      登陆
    </Button>
  );
}
