import TableComponent from '@/components/common/table';
import { Document } from '@/lib/schemas/types';
import { ColumnDef } from '@tanstack/react-table';
import { FC } from 'react';
import { fullColumns } from './columns';

interface Props {
  loading?: boolean;
  data?: Document[];
  columns?: ColumnDef<Document>[];
  header?: string;
}

export const DocumentsTable: FC<Props> = ({
  loading,
  data,
  columns = fullColumns,
  header,
}) => {
  return (
    <TableComponent
      data={data ?? []}
      columns={columns}
      loading={loading}
      heading={header ? { title: header } : undefined}
    />
  );
};
