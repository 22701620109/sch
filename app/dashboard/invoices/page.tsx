import { ClientForm } from '@/app/dashboard/invoices/custom-client';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  let email = '';
  if (session?.user?.email) {
    email = session.user.email;
  }
  return (
    <div className={'flex w-auto flex-col items-center justify-center'}>
      <div>创建一个新的账单</div>
      <div className={'mt-10 w-1/6'}>
        <ClientForm email={email} />
      </div>
    </div>
  );
}
