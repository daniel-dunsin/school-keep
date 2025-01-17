'use client';
import React, { useState } from 'react';
import DocumentsPageHeader from './header';
import { View } from '@/lib/schemas/enums';
import { useApiQuery } from '@/lib/hooks/use-query';
import { GetAllDocumentsQuery } from '@/lib/schemas/interfaces';
import { useQuery } from '@tanstack/react-query';
import documentService from '@/lib/services/documents.service';
import DocumentsGridView from './grid-view';
import { DocumentsTable } from '../tables/documents';
import { fullColumns } from '../tables/documents/columns';

const DocumentsPage = () => {
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
    queryKey: ['useGetAllDocuments', query.search],
    queryFn: async () => documentService.getAllDocuments(query.search),
  });

  return (
    <section className="my-5">
      <DocumentsPageHeader
        onSelect={onChangeView}
        selectedView={view}
        onSearch={(s) => changeQuery('search', s)}
      />

      {view == View.grid ? (
        <DocumentsGridView
          documents={documents ?? []}
          loading={gettingDocuments || refetchingDocuments}
        />
      ) : (
        <DocumentsTable
          columns={fullColumns}
          data={documents ?? []}
          loading={gettingDocuments || refetchingDocuments}
        />
      )}
    </section>
  );
};

export default DocumentsPage;
