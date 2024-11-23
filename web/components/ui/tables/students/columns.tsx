import { Student } from '@/lib/schemas/types';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import ListTile from '@/components/common/list-tile';

const defaultColumns: ColumnDef<Student>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'firstName lastName',
    cell({ row }) {
      return (
        <ListTile
          title={`${row?.original?.user?.firstName} ${row?.original?.user?.lastName}`}
          leadingImage={row?.original?.user?.profilePicture!}
        />
      );
    },
  },
  {
    id: 'email',
    header: 'Email Address',
    accessorKey: 'user.email',
  },
  {
    id: 'phoneNumber',
    header: 'Phone Number',
    accessorKey: 'user.phoneNumber',
  },
  {
    id: 'matricNumber',
    header: 'Matric Number',
    accessorKey: 'matricNumber',
  },
];

export const columns: ColumnDef<Student>[] = [
  ...defaultColumns,
  {
    id: 'view',
    header: '',
    accessorKey: '',
    cell: ({ row }) => (
      <Link
        href={`/dashboard/students/${row?.original?._id}`}
        className="underline text-mainLight"
      >
        View
      </Link>
    ),
  },
];

export const fullColumns: ColumnDef<Student>[] = [
  ...defaultColumns,
  {
    id: 'department',
    header: 'Department',
    cell({ row }) {
      if (!row?.original?.department) {
        return <></>;
      }

      return (
        <ListTile
          title={`${row?.original?.department?.name} - ${row?.original?.department?.unionName}`}
          leadingImage={row?.original?.department?.logo}
        />
      );
    },
  },
  {
    id: 'view',
    header: '',
    accessorKey: '',
    cell: ({ row }) => (
      <Link
        href={`/dashboard/students/${row?.original?._id}`}
        className="underline text-mainLight"
      >
        View
      </Link>
    ),
  },
];
