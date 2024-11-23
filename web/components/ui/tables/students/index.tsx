import TableComponent from '@/components/common/table';
import { Student } from '@/lib/schemas/types';
import React, { FC } from 'react';
import { columns, fullColumns } from './columns';

interface Props {
  students: Student[];
  showFull?: boolean;
  loading?: boolean;
}

const StudentsTable: FC<Props> = ({
  students,
  showFull = true,
  loading = false,
}) => {
  return (
    <TableComponent
      data={students}
      columns={showFull ? fullColumns : columns}
      heading={{ title: 'Students' }}
      loading={loading}
    />
  );
};

export default StudentsTable;
