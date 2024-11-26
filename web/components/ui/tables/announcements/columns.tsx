import ListTile from '@/components/common/list-tile';
import {
  AnnouncementDestination,
  AnnouncementStatus,
} from '@/lib/schemas/enums';
import { Announcement } from '@/lib/schemas/types';
import { cn, formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Actions from './actions';

export const columns: ColumnDef<Announcement>[] = [
  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Destination',
    accessorKey: 'destination_type',
    cell({ row: { original: data } }) {
      switch (data.destination_type) {
        case AnnouncementDestination.Colleges:
          const college = data.colleges[0];
          return <ListTile leadingImage={college.logo} title={college.name} />;
        case AnnouncementDestination.Departments:
          const department = data.departments[0];
          return (
            <ListTile leadingImage={department.logo} title={department.name} />
          );
        case AnnouncementDestination.General:
          return <p>General</p>;
      }
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell({
      row: {
        original: { status },
      },
    }) {
      return (
        <p
          className={cn(
            'px-2 py-1 rounded-sm uppercase text-[.8rem] text-white max-w-fit cursor-pointer',
            status === AnnouncementStatus.Active && 'bg-success',
            status === AnnouncementStatus.Inactive && 'bg-red-600'
          )}
        >
          {status}
        </p>
      );
    },
  },
  {
    header: 'Timeline',
    accessorKey: 'start_date, end_date',
    cell({ row: { original: data } }) {
      return (
        <p>
          {formatDate(data.start_date!)} - {formatDate(data.end_date!)}
        </p>
      );
    },
  },
  {
    header: '',
    accessorKey: 'actions',
    cell({ row: { original } }) {
      return <Actions announcement={original} />;
    },
  },
];
