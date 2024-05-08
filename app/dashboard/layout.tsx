import SideBar from '@/app/dashboard/side-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'flex min-h-screen bg-white'}>
      <div className={'h-screen w-1/6'}>
        <SideBar />
      </div>
      <div className={'min-h-screen w-screen bg-white pt-4'}>
        <div>{children}</div>
      </div>
    </div>
  );
}
