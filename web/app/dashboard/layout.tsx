'use client';
import DashboardLayout from '@/components/layout/dashboard-layout';
import DashboardSidebar from '@/components/layout/sidebar';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <DashboardLayout children={children} />
);

export default Layout;
