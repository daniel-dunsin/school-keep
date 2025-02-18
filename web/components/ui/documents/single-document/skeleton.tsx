import { cn } from '@/lib/utils';
import React from 'react';

const SingleDocumentPageSkeleton = () => {
  const pulse = 'rounded-md animate-pulse bg-gray-300';

  return (
    <section className="my-5 space-y-4">
      <header className={cn(pulse, 'h-[60px]')}></header>
      <div className="flex h-[250px] gap-4 w-full">
        <div className={cn(pulse, 'flex-[.4]')}></div>
        <div className={cn(pulse, 'flex-[.6]')}></div>
      </div>

      <div className={cn(pulse, 'ml-auto h-[50px] w-[200px]')}></div>
      <div className={cn(pulse, 'h-[60px]')}></div>
      <div className={cn(pulse, 'h-[300px]')}></div>
    </section>
  );
};

export default SingleDocumentPageSkeleton;
