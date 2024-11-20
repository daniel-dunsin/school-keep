import React, { FC } from 'react';

interface Props {
  departments: number;
}

const TotalDepartments: FC<Props> = ({ departments }) => {
  return (
    <article className="flex-1 bg-mainExtraLight px-4 py-10">
      <h1>Total Departments</h1>
      <h1 className="text-[3rem] font-bold">{departments ?? '---'}</h1>
    </article>
  );
};

export default TotalDepartments;
