import TableComponent from '@/components/common/table';
import { College } from '@/lib/schemas/types';
import schoolService from '@/lib/services/school.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { columns } from './columns';

interface Props {
  data?: College[];
  gettingColleges?: boolean;
}

const CollegeTable: FC<Props> = ({ data, gettingColleges }) => {
  console.log(data);
  return (
    <TableComponent
      data={data ?? []}
      columns={columns}
      loading={gettingColleges}
      heading={{
        title: 'All Colleges',
        description: 'List of colleges in your school',
      }}
    />
  );
};

export default CollegeTable;
