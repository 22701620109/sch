import { lusitana } from '@/app/ui/fonts';
import {
  getInternetDetailById,
  getMonthlyTrafficByUserEmail,
  getUserDashboard,
} from '@/app/lib/data';
import SDescription from '@/app/ui/s-component/s-description';
import { auth, signOut } from '@/auth';
import { Button } from 'antd';
import SProgress from '@/app/ui/s-component/s-progress';

export default async function Page() {
  const data = await getUserDashboard();
  let percent;
  let currentMonthTraffic;
  let trafficsList;
  const session = await auth();
  let internetDetail;
  if (session?.internetDetailId) {
    internetDetail = await getInternetDetailById(session.internetDetailId);
  }
  if (session?.user?.email) {
    const now = new Date();
    trafficsList = await getMonthlyTrafficByUserEmail(
      session.user.email,
      now.getFullYear(),
      now.getMonth(),
    );
    currentMonthTraffic = trafficsList.internetDetails.reduce((acc, cur) => {
      return acc + cur.currentTraffic;
    }, 0);

    percent = Math.min(
      currentMonthTraffic /
        trafficsList.billingStatements?.[0]?.totalTraffic /
        1000,
      100,
    );
  }

  const items = {
    ...data,
    ipAddress: internetDetail?.ipAddress,
    macAddress: internetDetail?.macAddress,
    signOut: (
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button htmlType={'submit'}>sign out</Button>
      </form>
    ),
    currentTraffic:
      (currentMonthTraffic ?? internetDetail?.currentTraffic ?? 0) / 1000,
    totalTraffic: trafficsList?.billingStatements[0].totalTraffic ?? 1000,
  };

  return (
    <main className={'h-full'}>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        仪表板
      </h1>
      {data && <SDescription items={items} />}
      <div
        className={'flex h-full w-full flex-col items-center justify-center'}
      >
        {percent && (
          <>
            <div className={'m-20'}>已用流量</div>
            <SProgress
              className={'mt-50'}
              percent={percent}
              type={'circle'}
              size={300}
            />
          </>
        )}
      </div>
    </main>
  );
}
