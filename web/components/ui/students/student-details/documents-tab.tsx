'use client';
import { Folder, Student } from '@/lib/schemas/types';
import React, { FC, useEffect, useState } from 'react';
import StudentFolders from '../../documents/student-folders';
import DocumentsList from '../../documents';
import { useSearchParams } from '@/lib/hooks/use-search-params';

interface Props {
  student: Student;
}

const folderParam = 'folder';

const StudentDocumentsTab: FC<Props> = ({ student }) => {
  const [selectedFolder, setSelectedFolder] = useState<string | undefined>();
  const { searchParams, setParam, removeParam } = useSearchParams();

  useEffect(() => {
    const folderId = searchParams.get(folderParam);
    if (folderId) {
      setSelectedFolder(folderId);
    }
  }, []);

  if (!selectedFolder) {
    const onFolderSelect = (folder: Folder) => {
      setSelectedFolder(folder._id);
      setParam(folderParam, folder._id);
    };

    return (
      <StudentFolders studentId={student._id} onFolderSelect={onFolderSelect} />
    );
  }

  return (
    <DocumentsList
      folderId={selectedFolder}
      onClose={() => (setSelectedFolder(undefined), removeParam(folderParam))}
    />
  );
};

export default StudentDocumentsTab;
