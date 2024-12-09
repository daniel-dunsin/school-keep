import TableComponent from '@/components/common/table';
import { Department, SchoolClearance } from '@/lib/schemas/types';
import React, { FC } from 'react';
import { clearanceColumns, departmentClearanceColumns } from './columns';

interface Props {
  data?: SchoolClearance[];
  loading?: boolean;
}

export const ClearanceTable: FC<Props> = ({ data, loading }) => {
  return (
    <TableComponent
      heading={{
        title: 'School Clearance List',
        description: 'Clearance created by the school',
      }}
      data={data ?? []}
      loading={loading}
      columns={clearanceColumns}
    />
  );
};

interface DepartmentClearanceProps {
  data?: Department[];
  loading?: boolean;
}

export const DepartmentClearanceTable: FC<DepartmentClearanceProps> = ({
  data,
  loading,
}) => {
  return (
    <TableComponent
      heading={{
        title: 'School Departments Clearance List',
        description: 'Clearance created by the school',
      }}
      data={data ?? []}
      loading={loading}
      columns={departmentClearanceColumns}
    />
  );
};
