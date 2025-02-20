'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  leadingImage: string;
  title: string;
  onClick?: (() => void) | string;
  trailing?: string;
}

const ListTile: FC<Props> = ({ title, leadingImage, onClick, trailing }) => {
  const { push } = useRouter();

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        onClick && 'underline cursor-pointer'
      )}
      onClick={() => {
        if (typeof onClick === 'string') {
          push(onClick);
        } else {
          onClick?.();
        }
      }}
    >
      <Image
        src={leadingImage}
        alt={title}
        width={80}
        height={80}
        className="w-[30px] h-[30px] rounded-full border-2 object-cover"
      />
      <div className="text-[.9rem] flex-1">{title}</div>

      {trailing && (
        <div className="text-[.9rem] justify-self-end">{trailing}</div>
      )}
    </div>
  );
};

export default ListTile;
