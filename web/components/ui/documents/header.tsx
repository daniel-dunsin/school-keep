'use client';
import Button from '@/components/common/button';
import SearchField from '@/components/common/input/search';
import { useSearchParams } from '@/lib/hooks/use-search-params';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { View } from '@/lib/schemas/enums';
import { Folder } from '@/lib/schemas/types';
import { cn } from '@/lib/utils';
import { ArrowLeftCircleIcon, TableIcon } from 'lucide-react';
import React, { FC, useEffect } from 'react';
import { BiPlus } from 'react-icons/bi';
import { CiGrid31 } from 'react-icons/ci';
import CreateDocumentModal from './modals/create-document-modal';

interface Props {
  onSelect(view: View): void;
  selectedView: View;
  onSearch(s?: string): void;
  onClose?(): void;
  folderId: string;
  studentId: string;
}

const viewParams = 'view';

const DocumentsPageHeader: FC<Props> = ({
  onSelect,
  selectedView,
  onSearch,
  onClose,
  folderId,
  studentId,
}) => {
  const { showModal } = useModal();
  const { setParam, searchParams } = useSearchParams();

  useEffect(() => {
    setParam(viewParams, selectedView);
  }, [selectedView]);

  useEffect(() => {
    const param = searchParams.get(viewParams);
    if (param) {
      onSelect(param as View);
    }
  }, []);

  return (
    <div className="my-8">
      <div className="flex items-center gap-3">
        {onClose && (
          <ArrowLeftCircleIcon size={35} onClick={onClose} cursor={'pointer'} />
        )}
        <SearchField
          InputProps={{ placeholder: 'Search documents...' }}
          onSearch={(s) => onSearch(s)}
        />
      </div>
      <div className="flex items-center justify-end space-x-3 mt-4">
        <ViewSwitch
          view={View.grid}
          selectedView={selectedView}
          onSelect={onSelect}
        />
        <ViewSwitch
          view={View.table}
          selectedView={selectedView}
          onSelect={onSelect}
        />

        <Button
          variant="outline"
          icon={<BiPlus />}
          onClick={() =>
            showModal(
              <CreateDocumentModal studentId={studentId} folder={folderId} />
            )
          }
        >
          Add Document
        </Button>
      </div>
    </div>
  );
};

interface ViewSwitchProps {
  view: View;
  selectedView: View;
  onSelect(view: View): void;
}

const ViewSwitch: FC<ViewSwitchProps> = ({ view, selectedView, onSelect }) => {
  return (
    <span
      className={cn(
        'block rounded-lg p-2 border cursor-pointer border-black',
        selectedView === view && 'bg-mainLight text-white border-mainLight',
        'hover:transition-all hover:duration-300  duration-300 transition-all' // transition
      )}
      onClick={() => onSelect(view)}
    >
      {view === View.grid ? (
        <CiGrid31 size={22.5} />
      ) : (
        <TableIcon size={22.5} />
      )}
    </span>
  );
};

export default DocumentsPageHeader;
