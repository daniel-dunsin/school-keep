'use client';
import { RequestClearanceStatus } from '@/lib/schemas/enums';
import { cn } from '@/lib/utils';
import React, { FC } from 'react';

interface Props {
  status: RequestClearanceStatus;
}

const ClearanceStatusChip: FC<Props> = ({ status }) => {
  const bgColor = cn(
    status === RequestClearanceStatus.REQUESTED
      ? 'bg-blue-600'
      : status === RequestClearanceStatus.IN_PROGRESS
      ? 'bg-success'
      : 'bg-red-600'
  );

  return (
    <p
      className={cn(
        'px-2 py-1 rounded-sm uppercase text-[.8rem] text-white max-w-fit cursor-pointer',
        bgColor
      )}
    >
      {status}
    </p>
  );
};

export default ClearanceStatusChip;
