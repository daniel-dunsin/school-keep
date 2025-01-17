import Image from 'next/image';
import React, { FC } from 'react';

interface Props {
  title?: string;
}

const NoData: FC<Props> = ({ title }) => {
  return (
    <div className="max-w-fit mx-auto min-h-[350px] flex flex-col items-center justify-center">
      <Image
        src={'/no-data.png'}
        alt="no-data"
        width={200}
        height={200}
        className="object-cover object-center w-[200px] h-[200px]"
      />

      {title && (
        <h1 className="mt-1 text-[1.3rem] font-semibold capitalize">
          {title ?? 'No Data'}
        </h1>
      )}
    </div>
  );
};

export default NoData;
