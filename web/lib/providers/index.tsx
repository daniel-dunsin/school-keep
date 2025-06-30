'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, ReactNode, useEffect } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/auth-context';
import { DashboardProvider } from './contexts/dashboard-context';
import { CreateCollegeProvider } from './contexts/create-college-context';
import { ModalProvider } from './contexts/modal-context';
import NextPageProgress from 'nextjs-toploader';
import LogRocket from 'logrocket';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPerformance from '@bugsnag/browser-performance';

export const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}
const AppProvider: FC<Props> = ({ children }) => {
  useEffect(() => {
    Bugsnag.start({
      apiKey: 'eb8840a23494d57956e48bddd0fe1032',
      plugins: [new BugsnagPluginReact()],
    });
    BugsnagPerformance.start({ apiKey: 'eb8840a23494d57956e48bddd0fe1032' });
    performance.getEntriesByType('');

    Bugsnag.notify(new Error('Test error'));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DashboardProvider>
          <CreateCollegeProvider>
            <ModalProvider>
              <Toaster position="bottom-right" />
              <NextPageProgress
                color="#8a05ff"
                shadow={'0 0 10px #8a05ff,0 0 5px #8a05ff'}
              />
              {children}
            </ModalProvider>
          </CreateCollegeProvider>
        </DashboardProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
