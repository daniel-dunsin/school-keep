import { Student } from '@/lib/schemas/types';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import Image from 'next/image';

const defaultColumns: ColumnDef<Student>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'firstName lastName',
    cell({ row }) {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={row?.original?.user?.profilePicture!}
            alt={row?.original?.user?.lastName!}
            width={80}
            height={80}
            className="w-[30px] h-[30px] rounded-full border-2 border-mainLight"
          />
          <p>
            {row?.original?.user?.firstName} {row?.original?.user?.lastName}
          </p>
        </div>
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
        return <>---</>;
      }

      return (
        <div className="flex items-center gap-2">
          <Image
            src={row?.original?.department?.logo!}
            alt={row?.original?.department?.name!}
            width={80}
            height={80}
            className="w-[30px] h-[30px] rounded-full border-2 border-mainLight"
          />
          <p>
            {row?.original?.department?.name} -{' '}
            {row?.original?.department?.unionName}
          </p>
        </div>
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
