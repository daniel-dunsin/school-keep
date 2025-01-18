'use client';
import documentService from '@/lib/services/documents.service';
import {
  getDocPreview,
  getDocTypeFromMimeType,
  getDocTypeIcon,
} from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeftIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { ProfileQuestionAndAnswer } from '../../students/student-details/profile-tab';
import ListTile from '@/components/common/list-tile';
import SingleDocumentPageSkeleton from './skeleton';

const SingleDocumentPage = () => {
  const router = useRouter();
  const { id: documentId } = useParams();

  const { data, isLoading: fetchingDocument } = useQuery({
    queryKey: ['useGetDocument', documentId],
    queryFn: async () => documentService.getDocument(documentId as string),
  });

  if (!data || fetchingDocument) {
    return <SingleDocumentPageSkeleton />;
  }

  const document = data.data;

  return (
    <section className="my-5">
      <header className="flex items-center flex-1 gap-4 text-[2.4rem] font-bold">
        <ArrowLeftIcon onClick={router.back} className="cursor-pointer" />
        <h2>{document.documentName}</h2>
      </header>

      <main className="flex gap-4 mt-8 h-[250px]">
        <div className="flex-[.4] border border-black overflow-hidden rounded-md shadow-sm">
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
            answer={
              <p className="capitalize">
                {getDocTypeFromMimeType(document.mediaType!)}
              </p>
            }
          />{' '}
          <ProfileQuestionAndAnswer
            question="Folder"
            answer={document.folder?.folderName}
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
              />
            }
          />
        </div>
      </main>
    </section>
  );
};

export default SingleDocumentPage;
