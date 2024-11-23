import TableComponent from '@/components/common/table';
import { Admin } from '@/lib/schemas/types';
import React, { FC } from 'react';
import { columns, fullColumns } from './columns';

interface Props {
  admins: Admin[];
  showFull?: boolean;
  loading?: boolean;
}

const AdminsTable: FC<Props> = ({
  admins,
  showFull = true,
  loading = false,
}) => {
  return (
    <TableComponent
      data={admins}
      columns={showFull ? fullColumns : columns}
      heading={{ title: 'Admins' }}
      loading={loading}
    />
  );
};

export default AdminsTable;
