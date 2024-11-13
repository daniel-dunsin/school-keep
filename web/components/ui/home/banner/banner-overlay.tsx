import { cn } from '@/lib/utils';
import React, { FC, ReactNode } from 'react';

interface Props {
  showOverlay: boolean;
  children: ReactNode;
}

const BannerOverlay: FC<Props> = ({ showOverlay, children }) => {
  const className = cn(
    'fixed top-0 left-0 z-[50] w-[100vw] h-[100vh] flex items-center justify-center',
    showOverlay && 'bg-black/50',
    !showOverlay && 'bg-transparent'
  );

  return <div className={className}>{children}</div>;
};

export default BannerOverlay;
