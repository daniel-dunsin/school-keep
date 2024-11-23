import ListTile from '@/components/common/list-tile';
import { College } from '@/lib/schemas/types';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const columns: ColumnDef<College>[] = [
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
    id: 'view',
    header: '',
    accessorKey: '',
    cell: ({ row }) => (
      <Link
        href={`/dashboard/faculties/${row?.original?._id}`}
        className="underline text-mainLight"
      >
        View
      </Link>
    ),
  },
];
