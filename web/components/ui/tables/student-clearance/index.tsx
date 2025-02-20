import TableComponent from '@/components/common/table';
import { ClearanceStatus } from '@/lib/schemas/enums';
import { Clearance } from '@/lib/schemas/types';
import { FC } from 'react';
import {
  approvedClearanceColumns,
  completedClearanceColumns,
  rejectedClearanceColumns,
  requestedClearanceColumns,
} from './columns';

interface Props {
  data?: Clearance[];
  tableType: ClearanceStatus;
  loading: boolean;
}

export const StudentClearanceTable: FC<Props> = ({
  data,
  loading,
  tableType,
}) => {
  const columns =
    tableType === ClearanceStatus.Approved
      ? approvedClearanceColumns
      : tableType === ClearanceStatus.Rejected
      ? rejectedClearanceColumns
      : tableType === ClearanceStatus.Requested
      ? requestedClearanceColumns
      : completedClearanceColumns;

  return (
    <TableComponent data={data ?? []} loading={loading} columns={columns} />
  );
};
