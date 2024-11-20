import React, { FC } from 'react';

interface Props {
  colleges: number;
}

const TotalColleges: FC<Props> = ({ colleges }) => {
  return (
    <article className="flex-1 bg-mainExtraLight px-4 py-10">
      <h1>Total Colleges</h1>
      <h1 className="text-[3rem] font-bold">{colleges ?? '---'}</h1>
    </article>
  );
};

export default TotalColleges;
