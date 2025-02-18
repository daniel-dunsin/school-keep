'use client';
import { Document } from '@/lib/schemas/types';
import { formatDate, getDocPreview, getDocTypeFromMimeType } from '@/lib/utils';
import { ArrowLeftIcon } from 'lucide-react';
import React, { FC } from 'react';
import { ProfileQuestionAndAnswer } from '../../students/student-details/profile-tab';
import ListTile from '@/components/common/list-tile';
import Button from '@/components/common/button';
import { useRouter } from 'next/navigation';
import { useModal } from '@/lib/providers/contexts/modal-context';
import EditDocumentModal from '../modals/edit-document-modal';
import { BiDownload } from 'react-icons/bi';
import DownloadModal from '@/components/common/modal/download-modal';

interface Props {
  document: Document;
}

const SingleDocumentHeader: FC<Props> = ({ document }) => {
  const router = useRouter();
  const { showModal } = useModal();

  const docType = getDocTypeFromMimeType(document.mediaType!);

  return (
    <>
      <header className="flex items-center flex-1 gap-4 text-[2rem] font-bold">
        <ArrowLeftIcon onClick={router.back} className="cursor-pointer" />
        <h2>{document.documentName}</h2>
      </header>

      <main className="flex gap-4 mt-8 h-[250px]">
        <div className="flex-[.4] border border-black overflow-hidden rounded-md shadow-sm flex items-center justify-center">
          {getDocPreview(document)}
        </div>
        <div className="flex-[.6] bg-white rounded-md border border-black shadow-sm p-4 grid grid-cols-3">
          <ProfileQuestionAndAnswer
            question="Document Name"
            answer={document.documentName}
          />{' '}
          <ProfileQuestionAndAnswer
            question="Document Version"
            answer={`v${document.version}`}
          />{' '}
          <ProfileQuestionAndAnswer
            question="Document Type"
            answer={<p className="capitalize">{docType}</p>}
          />{' '}
          <ProfileQuestionAndAnswer
            question="Folder"
            answer={document.folder?.folderName}
            onAnswerClick={() =>
              router.push(
                `/dashboard/students/${document.student?._id}?tab=Documents&folder=${document.folder?._id}`
              )
            }
          />
          <ProfileQuestionAndAnswer
            question="Student"
            answer={
              <ListTile
                title={
                  document.student?.user?.firstName +
                  ' ' +
                  document.student?.user?.lastName
                }
                leadingImage={document.student?.user?.profilePicture!}
                onClick={() =>
                  router.push(`/dashboard/students/${document.student?._id}`)
                }
              />
            }
          />
          <ProfileQuestionAndAnswer
            question="Version Uploaded By"
            answer={
              <ListTile
                title={
                  document.uploadedBy?.firstName +
                  ' ' +
                  document.uploadedBy?.lastName
                }
                leadingImage={document.uploadedBy?.profilePicture!}
                onClick={() =>
                  router.push(
                    document.uploadedBy?.admin
                      ? `/dashboard/admins/${document.uploadedBy?.admin?._id}`
                      : `/dashboard/students/${document.student?._id}`
                  )
                }
              />
            }
          />
          <ProfileQuestionAndAnswer
            question="Date Uploaded"
            answer={formatDate(document.createdAt)}
          />
        </div>
      </main>

      <div className="ml-auto max-w-fit flex gap-4 mt-4">
        <Button
          onClick={() => showModal(<EditDocumentModal document={document} />)}
          size="medium"
          variant="filled"
        >
          Edit Document
        </Button>

        <Button
          icon={<BiDownload />}
          size="medium"
          variant="filled"
          onClick={() =>
            showModal(
              <DownloadModal
                url={document.url!}
                studentName={`${document?.student?.user?.firstName} ${document?.student?.user?.lastName}`}
                fileName={document.documentName}
              />
            )
          }
        >
          Download
        </Button>
      </div>
    </>
  );
};

export default SingleDocumentHeader;
