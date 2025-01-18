import { cn } from '@/lib/utils';
import React from 'react';

const SingleDocumentPageSkeleton = () => {
  const pulse = 'rounded-md animate-pulse bg-gray-300';

  return (
    <section className="my-5">
      <header className={cn(pulse, 'h-[60px] mb-5')}></header>
      <div className="flex h-[250px] gap-4 w-full">
        <div className={cn(pulse, 'flex-[.4]')}></div>
        <div className={cn(pulse, 'flex-[.6]')}></div>
      </div>
    </section>
  );
};

export default SingleDocumentPageSkeleton;
