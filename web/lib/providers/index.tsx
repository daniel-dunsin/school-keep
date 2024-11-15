'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { FC, ReactNode } from 'react';
import { Toaster } from 'sonner';

export const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}
const AppProvider: FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default AppProvider;
