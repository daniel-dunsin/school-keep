import ListTile from '@/components/common/list-tile';
import { Document } from '@/lib/schemas/types';
import { formatDate, getDocTypeIcon } from '@/lib/utils';
import { ArrowRightCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  otherVersions: Document[];
}

const OtherDocumentVersion: FC<Props> = ({ otherVersions }) => {
  return (
    <section>
      <header>
        <h2 className="font-bold text-[1.8rem]">Other Versions</h2>
      </header>

      <div className="mt-4">
        {otherVersions?.map((doc, index) => (
          <SingleDocumentVersion
            currentVersion={doc}
            nextVersion={otherVersions[index - 1]}
            prevVersion={otherVersions[index + 1]}
            key={doc._id}
          />
        ))}
      </div>
    </section>
  );
};

interface SingleVersionProps {
  nextVersion?: Document;
  currentVersion: Document;
  prevVersion?: Document;
}

const SingleDocumentVersion: FC<SingleVersionProps> = ({
  nextVersion,
  currentVersion,
  prevVersion,
}) => {
  const router = useRouter();

  const getChanges = () => {
    if (currentVersion.version == 1 || !prevVersion) {
      return `Created ${currentVersion.documentName}`;
    } else {
      if (
        currentVersion.documentName != prevVersion?.documentName &&
        currentVersion.url != prevVersion?.url
      ) {
        return `Uploaded new file and updated document name to ${currentVersion.documentName}`;
      } else if (currentVersion.documentName != prevVersion?.documentName) {
        return `Updated document name to ${currentVersion.documentName}`;
      } else if (currentVersion.url != prevVersion?.url) {
        return 'Uploaded new file';
      } else {
        return 'No changes';
      }
    }
  };

  return (
    <>
      <article className="bg-white rounded-md py-4 px-5 border border-black shadow-sm min-h-[100px] flex items-center">
        <div className="flex-1">
          <header className="flex items-center gap-3">
            <span className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-mainLight text-white">
              v{currentVersion.version}
            </span>
            <p className="text-[.8rem] italic text-gray-600">{getChanges()}</p>
          </header>

          <div className="mt-4 flex items-center gap-3">
            {getDocTypeIcon(currentVersion.mediaType!)}{' '}
            {currentVersion.documentName}
          </div>

          <div className="flex items-center gap-3 mt-4">
            <p className="text-[.8rem] text-gray-600">Uploaded By:</p>
            <ListTile
              title={
                currentVersion.uploadedBy?.firstName +
                ' ' +
                currentVersion.uploadedBy?.lastName
              }
              leadingImage={currentVersion.uploadedBy?.profilePicture!}
              onClick={() =>
                router.push(
                  currentVersion.uploadedBy?.admin
                    ? `/dashboard/admins/${currentVersion.uploadedBy?.admin?._id}`
                    : `/dashboard/students/${currentVersion.student?._id}`
                )
              }
            />

            <p className="ml-4 text-[.8rem] text-gray-600">
              Date Uploaded:{' '}
              <b className="text-black">
                {formatDate(currentVersion.createdAt)}
              </b>
            </p>
          </div>
        </div>

        <div>
          <ArrowRightCircleIcon
            className="text-mainLight cursor-pointer"
            size={30}
            onClick={() =>
              router.push(`/dashboard/documents/${currentVersion?._id}`)
            }
          />
        </div>
      </article>
      {prevVersion && <div className="h-[60px] w-[1.5px] bg-black ml-8"></div>}
    </>
  );
};

export default OtherDocumentVersion;
