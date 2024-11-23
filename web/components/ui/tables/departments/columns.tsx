import ListTile from '@/components/common/list-tile';
import { Department } from '@/lib/schemas/types';
import { ColumnDef } from '@tanstack/react-table';

import Link from 'next/link';

const columns: ColumnDef<Department>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    cell({ row }) {
      return (
        <ListTile
          title={`${row?.original?.name}`}
          leadingImage={row?.original?.logo}
        />
      );
    },
  },

  {
    id: 'acronym',
    header: 'Acronym',
    accessorKey: 'unionName',
  },
  {
    id: 'levelsCount',
    header: 'Total Levels',
    accessorKey: '',
    cell: ({ row }) => <p>{row?.original?.levelsCount}00L</p>,
  },
  {
    id: 'totalAdmins',
    header: 'Total Admins',
    accessorKey: 'totalAdmins',
  },
  {
    id: 'totalStudents',
    header: 'Total Students',
    accessorKey: 'totalStudents',
  },
  {
    id: 'view',
    header: '',
    accessorKey: '',
    cell: ({ row }) => (
      <Link
        href={`/dashboard/faculties/department/${row?.original?._id}`}
        className="underline text-mainLight"
      >
        View
      </Link>
    ),
  },
];

export default columns;
