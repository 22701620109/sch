'use server';

import { z } from 'zod';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import prisma from '@/app/lib/prisma';
import { faker } from '@faker-js/faker';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function updateWhenSignOut(id: string) {
  const now = new Date();
  const curInternetDetail = await prisma.internetDetail.findUnique({
    where: {
      id,
    },
    select: {
      signInTime: true,
    },
  });
  if (curInternetDetail) {
    const signInTime = new Date(curInternetDetail.signInTime);
    const duration = now.getTime() - signInTime.getTime();
    await prisma.internetDetail.update({
      where: {
        id,
      },
      data: {
        signOutTime: now.toISOString(),
        duration,
        currentTraffic: duration * faker.number.int({ min: 5, max: 25 }),
      },
    });
  }
}

export type BillingValueType = {
  endDate: string;
  totalTraffic: number;
  product: string;
};

export async function createBillingStatementByUserEmail(
  email: string,
  billingValue: BillingValueType,
) {
  return prisma.users.update({
    where: {
      email,
    },
    data: {
      billingStatements: {
        create: {
          totalTraffic: billingValue.totalTraffic,
          product: billingValue.product,
          billingTime: billingValue.endDate,
          totalOnlineTime: 0,
        },
      },
    },
  });
}

export async function getBillingStatement(value: BillingValueType) {
  return prisma.billingStatement.findMany({
    where: {
      billingTime: value.endDate,
    },
  });
}
