'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/auth-context';
import { DashboardProvider } from './contexts/dashboard-context';
import { CreateCollegeProvider } from './contexts/create-college-context';
import { ModalProvider } from './contexts/modal-context';
import NextPageProgress from 'nextjs-toploader';

export const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}
const AppProvider: FC<Props> = ({ children }) => {
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
