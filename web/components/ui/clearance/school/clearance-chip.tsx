'use client';
import CircleLoader from '@/components/common/loader';
import { SchoolClearance } from '@/lib/schemas/types';
import { cn } from '@/lib/utils';
import { ArrowRightCircleIcon } from 'lucide-react';
import Image from 'next/image';
import React, { FC } from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
  loading: boolean;
  clearance: SchoolClearance;
  remove(id: string): void;
}

const ClearanceChip: FC<Props> = ({ clearance, remove, loading }) => {
  return (
    <>
      <article
        key={clearance?._id}
        className={
          'flex gap-2 text-[.8rem] px-3 py-1 border max-w-fit rounded-full cursor-pointer items-center border-gray-300  bg-white'
        }
      >
        <p>
          {clearance.clearance_name}{' '}
          {clearance.payment_required &&
            ` - N${clearance.fee?.toLocaleString()}`}
        </p>
        {!clearance.is_default && (
          <span
            onClick={() => {
              remove(clearance._id!);
            }}
          >
            <MdClose color={'black'} />
          </span>
        )}
      </article>
    </>
  );
};

export default ClearanceChip;
