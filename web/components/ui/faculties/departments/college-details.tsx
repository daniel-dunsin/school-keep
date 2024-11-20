'use client';
import Button from '@/components/common/button';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { College } from '@/lib/schemas/types';
import Image from 'next/image';
import React, { FC } from 'react';
import EditCollegeModal from '../modals/edit-college-modal';

interface Props {
  college?: College;
}

const CollegeDetailsHeader: FC<Props> = ({ college }) => {
  const { showModal } = useModal();

  return (
    <header className="flex items-center gap-3 justify-between mb-10">
      <div className="flex items-center gap-x-3">
        <Image
          src={college?.logo!}
          alt={college?.name!}
          width={1000}
          height={1000}
          className="w-[150px] h-[150px] object-cover object-center rounded-full border-2"
        />

        <div>
          <h1 className="font-semibold text-[1.5rem]">{college?.name}</h1>
          <p>{college?.unionName}</p>
        </div>
      </div>

      <div>
        <Button
          variant="outline"
          size="large"
          onClick={() => {
            showModal(<EditCollegeModal college={college!} />);
          }}
        >
          Edit College
        </Button>
      </div>
    </header>
  );
};

export default CollegeDetailsHeader;
