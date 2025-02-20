import ListTile from '@/components/common/list-tile';
import { Clearance } from '@/lib/schemas/types';
import { formatDate } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const approvedClearanceColumns: ColumnDef<Clearance>[] = [
  {
    header: 'Student',
    accessorKey: 'student.user.firstName',
    cell: ({ row }) => {
      const student = row.original?.student;
      return (
        <ListTile
          leadingImage={student?.user?.profilePicture!}
          title={student?.user?.firstName + ' ' + student?.user?.lastName}
          onClick={`/dashboard/students/${student._id}`}
        />
      );
    },
  },

  {
    header: 'Matric Number',
    accessorKey: 'student.matricNumber',
    cell: ({ row }) => {
      const student = row.original?.student;
      return <div>{student?.matricNumber}</div>;
    },
  },

  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original?.status;
      return (
        <p className="text-[.8rem] max-w-fit bg-green-500 text-white uppercase cursor-pointer p-2 rounded-sm">
          {status}
        </p>
      );
    },
  },

  {
    header: 'Date Approved',
    accessorKey: 'approvalDate',
    cell: ({ row }) => {
      const approvalDate = row?.original?.approvalDate;

      return approvalDate ? (
        <p className="text-[.9rem]">{formatDate(approvalDate)}</p>
      ) : (
        '---'
      );
    },
  },

  {
    header: '',
    accessorKey: 'view',
    cell: ({ row }) => {
      return (
        <Link
          className="text-mainLight underline"
          href={`/dashboard/clearance/student/${row.original?.student?._id}`}
        >
          View
        </Link>
      );
    },
  },
];

export const rejectedClearanceColumns: ColumnDef<Clearance>[] = [
  {
    header: 'Student',
    accessorKey: 'student.user.firstName',
    cell: ({ row }) => {
      const student = row.original?.student;
      return (
        <ListTile
          leadingImage={student?.user?.profilePicture!}
          title={student?.user?.firstName + ' ' + student?.user?.lastName}
          onClick={`/dashboard/students/${student._id}`}
        />
      );
    },
  },

  {
    header: 'Matric Number',
    accessorKey: 'student.matricNumber',
    cell: ({ row }) => {
      const student = row.original?.student;
      return <div>{student?.matricNumber}</div>;
    },
  },

  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original?.status;
      return (
        <p className="text-[.8rem] max-w-fit bg-red-500 text-white uppercase cursor-pointer p-2 rounded-sm">
          {status}
        </p>
      );
    },
  },

  {
    header: 'Date Rejected',
    accessorKey: 'rejectionDate',
    cell: ({ row }) => {
      const rejectionDate = row?.original?.rejectionDate;

      return rejectionDate ? (
        <p className="text-[.9rem]">{formatDate(rejectionDate)}</p>
      ) : (
        '---'
      );
    },
  },

  {
    header: 'Rejection Reason',
    accessorKey: 'rejectionReason',
    cell({ row }) {
      return row?.original?.rejectionReason || '---';
    },
  },

  {
    header: '',
    accessorKey: 'view',
    cell: ({ row }) => {
      return (
        <Link
          className="text-mainLight underline"
          href={`/dashboard/clearance/student/${row.original?.student?._id}`}
        >
          View
        </Link>
      );
    },
  },
];

export const requestedClearanceColumns: ColumnDef<Clearance>[] = [
  {
    header: 'Student',
    accessorKey: 'student.user.firstName',
    cell: ({ row }) => {
      const student = row.original?.student;
      return (
        <ListTile
          leadingImage={student?.user?.profilePicture!}
          title={student?.user?.firstName + ' ' + student?.user?.lastName}
          onClick={`/dashboard/students/${student._id}`}
        />
      );
    },
  },

  {
    header: 'Matric Number',
    accessorKey: 'student.matricNumber',
    cell: ({ row }) => {
      const student = row.original?.student;
      return <div>{student?.matricNumber}</div>;
    },
  },

  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original?.status;
      return (
        <p className="text-[.8rem] max-w-fit bg-blue-500 text-white uppercase cursor-pointer p-2 rounded-sm">
          {status}
        </p>
      );
    },
  },

  {
    header: 'Date Requested',
    accessorKey: 'lastRequestedDate',
    cell: ({ row }) => {
      const lastRequestedDate = row?.original?.lastRequestedDate;

      return lastRequestedDate ? (
        <p className="text-[.9rem]">{formatDate(lastRequestedDate)}</p>
      ) : (
        '---'
      );
    },
  },

  {
    header: '',
    accessorKey: 'view',
    cell: ({ row }) => {
      return (
        <Link
          className="text-mainLight underline"
          href={`/dashboard/clearance/student/${row.original?.student?._id}`}
        >
          View
        </Link>
      );
    },
  },
];

export const completedClearanceColumns: ColumnDef<Clearance>[] = [
  {
    header: 'Student',
    accessorKey: 'student.user.firstName',
    cell: ({ row }) => {
      const student = row.original?.student;
      return (
        <ListTile
          leadingImage={student?.user?.profilePicture!}
          title={student?.user?.firstName + ' ' + student?.user?.lastName}
          onClick={`/dashboard/students/${student._id}`}
        />
      );
    },
  },

  {
    header: 'Matric Number',
    accessorKey: 'student.matricNumber',
    cell: ({ row }) => {
      const student = row.original?.student;
      return <div>{student?.matricNumber}</div>;
    },
  },

  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original?.status;
      return (
        <p className="text-[.8rem] max-w-fit bg-green-500 text-white uppercase cursor-pointer p-2 rounded-sm">
          {status} 🎉
        </p>
      );
    },
  },

  {
    header: 'Date Completed',
    accessorKey: 'completionDate',
    cell: ({ row }) => {
      const completionDate = row?.original?.completionDate;

      return completionDate ? (
        <p className="text-[.9rem]">{formatDate(completionDate)}</p>
      ) : (
        '---'
      );
    },
  },

  {
    header: '',
    accessorKey: 'view',
    cell: ({ row }) => {
      return (
        <Link
          className="text-mainLight underline"
          href={`/dashboard/clearance/student/${row.original?.student?._id}`}
        >
          View
        </Link>
      );
    },
  },
];
