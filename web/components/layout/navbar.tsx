'use client';
import { useDashboardContext } from '@/lib/providers/contexts/dashboard-context';
import React from 'react';
import { BiBell } from 'react-icons/bi';

const DashboardNavbar = () => {
  const { page } = useDashboardContext();

  return (
    <nav className="flex items-center justify-between pt-6 px-6">
      <h1 className="text-[1.5rem] uppercase font-bold">{page}</h1>

      <BiBell size={25} cursor={'pointer'} />
    </nav>
  );
};

export default DashboardNavbar;
