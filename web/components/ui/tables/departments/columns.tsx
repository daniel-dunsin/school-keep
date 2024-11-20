import { Department } from '@/lib/schemas/types';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'lucide-react';
import Image from 'next/image';

const columns: ColumnDef<Department>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    cell({ row }) {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={row?.original?.logo}
            alt={row?.original?.name}
            width={80}
            height={80}
            className="w-[30px] h-[30px] rounded-full border-2 border-mainLight"
          />
          <p>{row?.original?.name}</p>
        </div>
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
    cell: ({ row }) => <p className="underline text-mainLight">View</p>,
  },
];

export default columns;
