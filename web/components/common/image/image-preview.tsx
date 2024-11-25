import Image from 'next/image';
import React, { FC } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface Props {
  image: File;
  alt: string;
  onRemove(): void;
}

const ImagePreview: FC<Props> = ({ image, alt, onRemove }) => {
  return (
    <div className="relative w-full h-full">
      <Image
        width={1000}
        height={250}
        src={URL.createObjectURL(image)}
        alt={alt}
        className="h-full w-full object-contain"
      />
      <div className="absolute bg-black/50 w-full h-full top-0 left-0">
        <span className="absolute top-[30px] right-[30px]">
          <IoMdCloseCircleOutline
            color="white"
            size={30}
            cursor={'pointer'}
            onClick={() => onRemove()}
          />
        </span>
      </div>
    </div>
  );
};

export default ImagePreview;
