'use client';
import SearchField from '@/components/common/input/search';
import { View } from '@/lib/schemas/enums';
import { cn } from '@/lib/utils';
import { GridIcon, TableIcon } from 'lucide-react';
import React, { FC } from 'react';
import { CiGrid31 } from 'react-icons/ci';

interface Props {
  onSelect(view: View): void;
  selectedView: View;
  onSearch(s?: string): void;
}

const DocumentsPageHeader: FC<Props> = ({
  onSelect,
  selectedView,
  onSearch,
}) => {
  return (
    <div className="my-8">
      <SearchField
        InputProps={{ placeholder: 'Search documents...' }}
        onSearch={(s) => onSearch(s)}
      />

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
