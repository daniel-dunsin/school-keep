import type { Metadata } from 'next';
import './globals.css';
import { poppins } from '@/lib/utils/font';
import AppProvider from '@/lib/providers';

export const metadata: Metadata = {
  title: 'School Keep',
  description: 'All your documents in one place 👩🏻‍🍳',
  keywords: ['school', 'document', 'clearance', 'univeristy'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
