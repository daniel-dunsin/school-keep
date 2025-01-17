'use client';
import documentService from '@/lib/services/documents.service';
import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import SingleFolder from './single-folder';
import { Folder } from '@/lib/schemas/types';

interface Props {
  studentId: string;
  onFolderSelect?(folder: Folder): void;
}

const StudentFolders: FC<Props> = ({ studentId, onFolderSelect }) => {
  const { data: folders, isLoading: gettingFolders } = useQuery({
    queryKey: ['useGetFolders', studentId],
    queryFn: () => documentService.getStudentFolders(studentId),
  });

  if (gettingFolders) {
    return (
      <div className="grid grid-cols-4 gap-x-3 gap-y-6">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-6">
      {folders?.map((folder) => (
        <SingleFolder
          folder={folder}
          key={folder._id}
          onClick={onFolderSelect}
        />
      ))}
    </div>
  );
};

export const Skeleton = () => {
  return (
    <div className="space-y-3">
      <div className="w-full h-[120px] rounded-md bg-gray-300 animate-pulse"></div>
      <div className="w-full h-[40px] rounded-md bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export default StudentFolders;
