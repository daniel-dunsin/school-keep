import ListTile from '@/components/common/list-tile';
import { Document } from '@/lib/schemas/types';
import { formatDate, getDocPreview } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const fullColumns: ColumnDef<Document>[] = [
  {
    header: 'Name',
    accessorKey: 'documentName',
    id: 'documentName',
    cell({ row }) {
      const document = row.original;
      const preview = getDocPreview(document);

      return (
        <div className="flex items-center mt-3 gap-3">
          <span className="w-[30px] h-[30px] rounded-full grid place-content-center border border-mainLight overflow-hidden">
            {preview}
          </span>
          <div className="flex-1">
            <p className="text-[.8rem] w-full">
              {document.documentName.length > 26
                ? `${document.documentName.slice(0, 26)}...`
                : document.documentName}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    header: 'Version',
    accessorKey: 'version',
    id: 'version',
    cell({ row }) {
      const v = row?.original?.version;
      return 'v' + v;
    },
  },
  {
    header: 'Folder',
    accessorKey: 'folder.folderName',
    id: 'folder.folderName',
  },
  {
    header: 'Student',
    accessorKey: 'student',
    id: 'student',
    cell({ row }) {
      const student = row.original?.student;
      return (
        <ListTile
          leadingImage={student?.user?.profilePicture!}
          title={student?.user?.firstName + ' ' + student?.user?.lastName}
          onClick={() =>
            (window.location.href = `/dashboard/students/${student?._id}`)
          }
        />
      );
    },
  },
  {
    header: 'Uploaded By',
    accessorKey: 'uploadedBy',
    cell({ row }) {
      const user = row.original.uploadedBy;
      const isAdmin = user?.admin;
      const student = row.original.student;

      const userName =
        `${user?.firstName} ${user?.lastName}` +
        (isAdmin
          ? `(${user?.admin?.department?.unionName ?? 'School'} Admin)`
          : '');

      return (
        <ListTile
          leadingImage={user?.profilePicture!}
          title={userName}
          onClick={() =>
            isAdmin
              ? (window.location.href = `/dashboard/admins/${user?.admin?._id}`)
              : (window.location.href = `/dashboard/students/${student?._id}`)
          }
        />
      );
    },
  },
  {
    header: 'Date Uploaded',
    accessorKey: 'createdAt',
    cell({ row }) {
      return formatDate(row?.original?.createdAt);
    },
  },
  {
    header: '',
    accessorKey: '',
    cell({ row }) {
      return (
        <Link
          href={`/dashboard/documents/${row.original._id}`}
          className="underline text-mainLight text-[.9rem]"
        >
          View
        </Link>
      );
    },
  },
];

export const studentDocumentsColumns: ColumnDef<Document>[] = [
  ...fullColumns,
].filter((c) => c.id != 'student');

export const studentFolderDocumentsColumns: ColumnDef<Document>[] = [
  ...fullColumns,
].filter((c) => c.id != 'student' && c.id != 'folder');
