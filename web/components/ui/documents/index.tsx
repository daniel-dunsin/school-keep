'use client';
import React, { FC, useState } from 'react';
import DocumentsPageHeader from './header';
import { View } from '@/lib/schemas/enums';
import { useApiQuery } from '@/lib/hooks/use-query';
import { GetAllDocumentsQuery } from '@/lib/schemas/interfaces';
import { useQuery } from '@tanstack/react-query';
import documentService from '@/lib/services/documents.service';
import DocumentsGridView from './grid-view';
import { DocumentsTable } from '../tables/documents';
import {
  fullColumns,
  studentFolderDocumentsColumns,
} from '../tables/documents/columns';

interface Props {
  folderId?: string;
  onClose?(): void;
}

const DocumentsList: FC<Props> = ({ folderId, onClose }) => {
  const { changeQuery, query } = useApiQuery<GetAllDocumentsQuery>({
    defaultValues: {
      search: '',
    },
  });
  const [view, setView] = useState<View>(View.grid);

  const onChangeView = (view: View) => setView(view);

  const {
    data: documents,
    isLoading: gettingDocuments,
    isRefetching: refetchingDocuments,
  } = useQuery({
    queryKey: ['useGetAllDocuments', query.search, folderId],
    queryFn: async () =>
      documentService.getAllDocuments({
        search: query.search,
        folder_id: folderId as string,
      }),
  });

  return (
    <section className="my-5">
      <DocumentsPageHeader
        onSelect={onChangeView}
        selectedView={view}
        onSearch={(s) => changeQuery('search', s)}
        onClose={onClose}
      />

      {view == View.grid ? (
        <DocumentsGridView
          documents={documents ?? []}
          loading={gettingDocuments || refetchingDocuments}
        />
      ) : (
        <DocumentsTable
          columns={folderId ? studentFolderDocumentsColumns : fullColumns}
          data={documents ?? []}
          loading={gettingDocuments || refetchingDocuments}
        />
      )}
    </section>
  );
};

export default DocumentsList;
