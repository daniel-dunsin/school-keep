'use client';
import React, { useEffect, useState } from 'react';
import DashboardSidebar from './sidebar';
import { useAuthContext } from '@/lib/providers/contexts/auth-context';
import { AuthSession } from '@/lib/schemas/types';
import { useRouter } from 'next/navigation';

const DashboardLayout = () => {
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
      <div className="w-full flex-1">
        <p>Layout content</p>
      </div>
    </main>
  );
};

export default DashboardLayout;
