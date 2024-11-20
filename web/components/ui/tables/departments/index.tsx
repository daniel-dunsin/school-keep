import TableComponent from '@/components/common/table';
import { College, Department } from '@/lib/schemas/types';
import schoolService from '@/lib/services/school.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import columns from './columns';

interface Props {
  data?: Department[];
  loading?: boolean;
}

const DepartmentsTable: FC<Props> = ({ data, loading }) => {
  return (
    <TableComponent
      data={data ?? []}
      columns={columns}
      loading={loading}
      heading={{
        title: 'All Departments',
      }}
    />
  );
};

export default DepartmentsTable;
