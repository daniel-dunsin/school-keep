'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/auth-context';
import { DashboardProvider } from './contexts/dashboard-context';

export const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}
const AppProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DashboardProvider>
          <Toaster position="bottom-right" />
          {children}
        </DashboardProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
