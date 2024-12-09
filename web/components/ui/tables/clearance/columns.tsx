import { Department, SchoolClearance } from '@/lib/schemas/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  ClearanceTableActions,
  DepartmentClearanceTableActions,
} from './actions';
import ListTile from '@/components/common/list-tile';

export const clearanceColumns: ColumnDef<SchoolClearance>[] = [
  {
    header: 'Name',
    accessorKey: 'clearance_name',
  },
  {
    header: 'Fee',
    accessorKey: 'fee',
    cell({ row: { original } }) {
      return (
        <p>
          {original?.payment_required
            ? `N${original?.fee?.toLocaleString()}`
            : '---'}
        </p>
      );
    },
  },
  {
    header: 'Required Documents',
    accessorKey: 'required_documents',
    cell({ row: { original } }) {
      return (
        <p>
          {original?.required_documents
            ?.filter((e) => (e.trim() ? true : false))
            ?.join(', ') || '---'}
        </p>
      );
    },
  },
  {
    header: '',
    accessorKey: 'actions',
    cell({ row: { original } }) {
      return <ClearanceTableActions clearance={original} />;
    },
  },
];

export const departmentClearanceColumns: ColumnDef<Department>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    cell({ row: { original } }) {
      return (
        <ListTile
          title={original?.name + ' - ' + original?.unionName}
          leadingImage={original?.logo}
        />
      );
    },
  },
  {
    header: 'Required Clearance',
    accessorKey: 'required_clearance',
    cell({ row: { original } }) {
      return (
        <p>
          {original?.required_clearance
            ?.map((e) => e.clearance_name)
            ?.join(', ') || '---'}
        </p>
      );
    },
  },
  {
    header: '',
    accessorKey: 'actions',
    cell({ row: { original } }) {
      return <DepartmentClearanceTableActions department={original} />;
    },
  },
];
