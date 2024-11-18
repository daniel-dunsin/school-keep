'use client';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import DashboardSidebar from './sidebar';
import { useAuthContext } from '@/lib/providers/contexts/auth-context';
import { AuthSession } from '@/lib/schemas/types';
import { useRouter } from 'next/navigation';
import DashboardNavbar from './navbar';

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession>('loading');
  const { getLoggedInUser, user } = useAuthContext();

  useEffect(() => {
    if (user) {
      setSession('authenticated');
    } else {
      getLoggedInUser().then((data) => {
        if (data) {
          setSession('authenticated');
        } else {
          setSession('unauthenticated');
          router.push('/');
        }
      });
    }
  }, []);

  if (session === 'loading') {
    return (
      <section className="w-screen h-screen text-center bg-gray-50 flex items-center justify-center">
        <p>Authenticating</p>
      </section>
    );
  }

  if (session === 'unauthenticated') {
    return <></>;
  }

  return (
    <main className="flex bg-gray-100 min-h-screen">
      <DashboardSidebar />
      <div className="w-full flex-1 max-h-screen h-screen flex flex-col">
        <DashboardNavbar />
        <div className="flex-1 overflow-y-scroll px-6">{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
