'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/auth-context';

export const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}
const AppProvider: FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="bottom-right" />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
