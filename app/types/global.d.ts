import { PrismaClient } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    internetDetailId: string;
  }

  interface User {
    internetDetailId: string;
  }

  interface JWT {
    internetDetailId: string;
  }
}

declare global {
  var prisma: PrismaClient;
}
