'use client';
import { Menu, MenuProps } from 'antd';
import { Key, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

type MenuItem = Required<MenuProps>['items'][number];

export enum SideBarEnum {
  SignOut = 'sign_out',
  Dashboard = '/dashboard',
  DashboardInvoices = '/dashboard/invoices',
  DashboardCustomers = '/dashboard/customers',
}

function getItemMiddleware(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItemMiddleware('Home', 'sub1', null, [
    getItemMiddleware('Dashboard', SideBarEnum.Dashboard, null),
    getItemMiddleware('Invoices', SideBarEnum.DashboardInvoices, null),
    getItemMiddleware('Customers', SideBarEnum.DashboardCustomers, null),
  ]),
  getItemMiddleware('Sing out', SideBarEnum.SignOut, null),
];

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

  async function sideBarHandler(key: string) {
    if (key === SideBarEnum.SignOut) {
      await signOut();
    } else {
      router.push(key);
    }
  }

  return (
    <Menu
      items={items}
      onClick={(e) => sideBarHandler(e.key)}
      defaultSelectedKeys={[pathname]}
      defaultOpenKeys={['sub1']}
      mode={'inline'}
    />
  );
}
