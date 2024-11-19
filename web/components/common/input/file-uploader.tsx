import React, { FC } from 'react';
import { BiUpload } from 'react-icons/bi';

interface Props {
  inputType?: string;
  onUpload?(file?: File): void;
}

const FileUploader: FC<Props> = ({ onUpload, inputType = 'image/*' }) => {
  const randomId = Math.random().toString();

  return (
    <label
      htmlFor={randomId}
      className="w-full p-4 h-full bg-white border-dashed border-black border-2 flex items-center justify-center flex-col cursor-pointer"
    >
      <input
        id={randomId}
        className="hidden"
        type="file"
        accept={inputType}
        onChange={(e) => onUpload?.(e.target.files?.[0])}
      />
      <span>
        <BiUpload size={50} className="text-mainLight" />
      </span>
      <h3 className="font-bold mt-3">Upload Files ({inputType})</h3>
    </label>
  );
};

export default FileUploader;
