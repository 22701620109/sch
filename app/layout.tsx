'use client';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { StyleProvider } from '@ant-design/cssinjs';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id={'app'} className={`${inter.className} antialiased`}>
        <SessionProvider>
          <StyleProvider hashPriority={'high'}>
            <AntdRegistry>{children}</AntdRegistry>
          </StyleProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
