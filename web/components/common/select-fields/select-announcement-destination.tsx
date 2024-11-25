import React, { FC } from 'react';
import SelectField from '../input/select-field';
import { AnnouncementDestination } from '@/lib/schemas/enums';

interface Props {
  selected?: AnnouncementDestination;
  onSelect(permission?: AnnouncementDestination): void;
  disabled?: boolean;
}

const SelectAnnouncementDestionation: FC<Props> = ({
  selected,
  onSelect,
  disabled = false,
}) => {
  return (
    <SelectField
      value={selected}
      disabled={disabled}
      className="w-full"
      onClear={() => onSelect(undefined)}
      onSelect={({ value }) => {
        onSelect(value);
      }}
      data={Object.values(AnnouncementDestination).map((v) => ({
        value: v,
        label: v,
        id: v,
      }))}
      onSearch={(search) => {
        return Object.values(AnnouncementDestination)
          .filter((destination_type) =>
            destination_type.toLowerCase().includes(search?.toLowerCase() ?? '')
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

export default SelectAnnouncementDestionation;
