'use client';
import documentService from '@/lib/services/documents.service';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import SingleDocumentPageSkeleton from './skeleton';
import SingleDocumentHeader from './header';
import OtherDocumentVersion from './other-versions';

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

  const doc = data?.data;

  return (
    <section className="my-5">
      <SingleDocumentHeader document={doc} />
      <OtherDocumentVersion otherVersions={data?.meta?.otherVersions ?? []} />
    </section>
  );
};

export default SingleDocumentPage;
