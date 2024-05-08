import { auth, signIn } from '@/auth';
import { Session } from 'next-auth';
import prisma from '@/app/lib/prisma';

export async function fetchInvoicesPages(query: string) {}

export async function fetchInvoiceById(id: string) {}

export async function fetchCustomers() {}

async function getSession(): Promise<Session | undefined> {
  const session = await auth();
  if (!session) {
    await signIn();
  } else {
    return session;
  }
}

export async function getUserDashboard() {
  const session = await getSession();
  if (session?.user?.email) {
    const users = await prisma.users.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (users) {
      const { name, email, status } = users;
      return {
        name,
        email,
        status,
      };
    }
  }
}

export async function getInternetDetailById(id: string) {
  return prisma.internetDetail.findUnique({
    where: {
      id,
    },
  });
}

export async function getMonthlyTrafficByUserEmail(
  email: string,
  year: number,
  month: number,
) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 1);
  const now = new Date();
  return prisma.users.findUniqueOrThrow({
    where: {
      email,
    },
    select: {
      status: true,
      internetDetails: {
        where: {
          signInTime: {
            gte: startDate,
            lt: endDate,
          },
        },
        select: {
          currentTraffic: true,
          signInTime: true,
        },
      },
      billingStatements: {
        select: {
          totalTraffic: true,
          billingTime: true,
        },
        where: {
          billingTime: {
            gte: now,
          },
        },
        orderBy: {
          billingTime: 'desc',
        },
      },
    },
  });
}
