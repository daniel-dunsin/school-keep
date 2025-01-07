import React, { FC } from 'react';
import SelectField from '../input/select-field';
import { AnnouncementDestination } from '@/lib/schemas/enums';

interface Props {
  selected?: AnnouncementDestination;
  onSelect(permission?: AnnouncementDestination): void;
  disabled?: boolean;
  placeholder?: string;
}

const SelectClearanceFeeRequired: FC<Props> = ({
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
      data={[true, false].map((v) => ({
        value: v,
        label: v,
        id: String(v),
      }))}
      onSearch={(search) => {
        return [true, false]
          .filter((value) =>
            String(value)
              .toLowerCase()
              .includes(search?.toLowerCase() ?? '')
          )
          .map((v) => ({
            value: v,
            label: v,
            id: String(v),
          }));
      }}
    />
  );
};

export default SelectClearanceFeeRequired;
