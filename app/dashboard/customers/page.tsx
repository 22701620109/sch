'use client';
import { Button } from 'antd';
import { signOut } from 'next-auth/react';

export default function Page() {
  return (
    <>
      <Button onClick={() => signOut()}>退出登录</Button>
    </>
  );
}
