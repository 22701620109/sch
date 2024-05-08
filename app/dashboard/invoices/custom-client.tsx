'use client';
import { FormFieldType, formItems } from '@/app/dashboard/invoices/config';
import SForm from '@/app/ui/s-component/s-form';
import {
  createBillingStatementByUserEmail,
  getBillingStatement,
} from '@/app/lib/actions';
import { message } from 'antd';

interface IProps {
  email: string;
}

export function ClientForm({ email }: IProps) {
  async function handleOnFinish(value: FormFieldType) {
    const endDate = value.endDate
      ? value.endDate.toISOString()
      : new Date().toISOString();

    const billingValue = {
      totalTraffic: value.totalTraffic,
      product: value.product,
      endDate: endDate,
    };

    const billingStatement = await getBillingStatement(billingValue);
    if (billingStatement) {
      message.error('请勿重复添加');
      return;
    }

    await createBillingStatementByUserEmail(email, billingValue);
    message.info('已成功添加');
  }

  return (
    <SForm<FormFieldType> formItems={formItems} onFinish={handleOnFinish} />
  );
}
