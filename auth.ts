import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { User } from '@/app/lib/definitions';
import prisma from '@/app/lib/prisma';
import { updateWhenSignOut } from '@/app/lib/actions';
import { faker } from '@faker-js/faker';

async function getUser(email: string): Promise<User | null> {
  try {
    return await prisma.users.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            const id = user.id;
            const newInternetDetail = await prisma.internetDetail.create({
              data: {
                macAddress: faker.internet.mac(), // 假设这是用户的MAC地址
                ipAddress: faker.internet.ipv4(), // 假设这是用户的IP地址
                userId: id,
              },
            });
            return {
              ...user,
              internetDetailId: newInternetDetail.id,
            };
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  events: {
    async signOut(session) {
      // @ts-ignore-expect
      if (session?.token?.internetDetailId) {
        // @ts-ignore-expect
        await updateWhenSignOut(session.token.internetDetailId);
      }
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.internetDetailId = user.internetDetailId;
      }
      return token;
    },
    session({ session, token }) {
      session.internetDetailId = token.internetDetailId as string;
      return session;
    },
  },
});
