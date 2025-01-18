import ListTile from '@/components/common/list-tile';
import { DocType } from '@/lib/schemas/enums';
import { Document } from '@/lib/schemas/types';
import {
  cn,
  getDocPreview,
  getDocTypeFromMimeType,
  getDocTypeIcon,
} from '@/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';

interface Props {
  document: Document;
}

const SingleDocument: FC<Props> = ({ document }) => {
  const router = useRouter();
  const docType = getDocTypeFromMimeType(document.mediaType!);
  const docIcon = getDocTypeIcon(document.mediaType!, 'white');
  const hasPreview =
    [DocType.image, DocType.video].includes(docType) && document.url;
  const documentName =
    document.documentName.length > 26
      ? `${document.documentName.slice(0, 26)}...`
      : document.documentName;

  const [showName, setShowName] = useState<boolean>(false);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setShowName(true)}
      onMouseLeave={() => setShowName(false)}
      onClick={() => router.push(`/dashboard/documents/${document._id}`)}
    >
      <div className="relative mb-3">
        <div className="h-[200px] w-full rounded-md overflow-hidden flex flex-col gap-3 text-center justify-center items-center border border-black cursor-pointer">
          {getDocPreview(document, hasPreview ? 'white' : 'black')}
          {!hasPreview && <p className="text-[.9rem]">{documentName}</p>}
        </div>

        {hasPreview && (
          <div
            className={cn(
              'absolute bottom-0 left-0 bg-black/30 h-full w-full text-white cursor-pointer transition-all duration-300 gap-3 overflow-hidden',
              showName && 'h-full',
              !showName && 'h-0'
            )}
          >
            <div className="flex flex-col p-2 justify-center items-center w-full h-full">
              <span className="w-[30px] !text-white">{docIcon}</span>

              <p className="text-[.9rem] w-full text-center">{documentName}</p>
            </div>
          </div>
        )}
      </div>

      <ListTile
        title={
          document?.student?.user?.firstName +
          ' ' +
          document?.student?.user?.lastName
        }
        leadingImage={document?.student?.user?.profilePicture!}
        trailing={format(document?.createdAt, 'dd/MM/yyyy')}
      />
    </div>
  );
};

export const GridDocumentSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="w-full h-[200px] rounded-md bg-gray-300 animate-pulse"></div>
      <div className="w-full h-[60px] rounded-md bg-gray-300 animate-pulse"></div>
    </div>
  );
};

export default SingleDocument;
