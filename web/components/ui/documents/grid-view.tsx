import { Document } from '@/lib/schemas/types';
import React, { FC } from 'react';
import SingleDocument, {
  GridDocumentSkeleton as Skeleton,
} from './single-document';
import NoData from '@/components/common/no-data';

interface Props {
  documents?: Document[];
  loading?: boolean;
}

const DocumentsGridView: FC<Props> = ({ loading, documents }) => {
  if (loading) {
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

  if (documents?.length === 0) {
    return <NoData title="No documents found" />;
  }

  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-6">
      {documents?.map((doc) => {
        return <SingleDocument key={doc._id} document={doc} />;
      })}
    </div>
  );
};

export default DocumentsGridView;
