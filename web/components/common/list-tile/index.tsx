import Image from 'next/image';
import React, { FC } from 'react';

interface Props {
  leadingImage: string;
  title: string;
}

const ListTile: FC<Props> = ({ title, leadingImage }) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={leadingImage}
        alt={title}
        width={80}
        height={80}
        className="w-[30px] h-[30px] rounded-full border-2"
      />
      <p>{title}</p>
    </div>
  );
};

export default ListTile;
