import { Folder } from '@/lib/schemas/types';
import { FolderIcon } from 'lucide-react';
import React, { FC } from 'react';
import { FaFolder } from 'react-icons/fa';

interface Props {
  folder: Folder;
  onClick?: (folder: Folder) => void;
}

const SingleFolder: FC<Props> = ({ folder, onClick }) => {
  return (
    <div
      className="w-full hover:bg-black/10 rounded-md"
      onClick={() => onClick?.(folder)}
    >
      <div className="relative mb-3">
        <div className="h-[120px] flex gap-3 text-center justify-center items-center cursor-pointer">
          <FaFolder className="text-black" size={90} />
        </div>

        <p className="text-center cursor-pointer">{folder.folderName}</p>
      </div>
    </div>
  );
};

export default SingleFolder;
