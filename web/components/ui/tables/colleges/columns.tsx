import { College } from '@/lib/schemas/types';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Link from 'next/link';

export const columns: ColumnDef<College>[] = [
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
    id: 'view',
    header: '',
    accessorKey: '',
    cell: ({ row }) => (
      <Link href={row?.original?.name} className="underline text-mainLight">
        View
      </Link>
    ),
  },
];
