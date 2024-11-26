import React, { FC } from 'react';
import SelectField from '../input/select-field';
import { AnnouncementStatus } from '@/lib/schemas/enums';

interface Props {
  selected?: AnnouncementStatus;
  onSelect(permission?: AnnouncementStatus): void;
  disabled?: boolean;
  placeholder?: string;
}

const SelectAnnouncementStatus: FC<Props> = ({
  selected,
  onSelect,
  disabled = false,
  placeholder,
}) => {
  return (
    <SelectField
      value={selected}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full"
      onClear={() => onSelect(undefined)}
      onSelect={({ value }) => {
        onSelect(value);
      }}
      data={Object.values(AnnouncementStatus).map((v) => ({
        value: v,
        label: v,
        id: v,
      }))}
      onSearch={(search) => {
        return Object.values(AnnouncementStatus)
          .filter((status) =>
            status.toLowerCase().includes(search?.toLowerCase() ?? '')
          )
          .map((v) => ({
            value: v,
            label: v,
            id: v,
          }));
      }}
    />
  );
};

export default SelectAnnouncementStatus;
