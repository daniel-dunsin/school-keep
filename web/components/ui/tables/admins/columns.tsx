import ListTile from '@/components/common/list-tile';
import { Admin } from '@/lib/schemas/types';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import Actions from './actions';

export const columns: ColumnDef<Admin>[] = [
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
];

export const fullColumns: ColumnDef<Admin>[] = [
  ...columns,
  {
    id: 'role',
    header: 'Role',
    cell({ row }) {
      return <p className="capitalize">{row?.original?.permission}</p>;
    },
  },
  {
    id: 'department',
    header: 'Department',
    cell({ row }) {
      if (!row?.original?.department) {
        return <></>;
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
    id: 'actions',
    header: '',
    cell({ row }) {
      return <Actions admin={row?.original} />;
    },
  },
];
