import React, { FC } from 'react';
import SelectField from '../input/select-field';
import { AnnouncementDestination } from '@/lib/schemas/enums';
import { SchoolClearance } from '@/lib/schemas/types';

interface Props {
  selected?: SchoolClearance;
  onSelect(permission?: SchoolClearance): void;
  disabled?: boolean;
  placeholder?: string;
  data?: SchoolClearance[];
}

const SelectClearance: FC<Props> = ({
  selected,
  onSelect,
  disabled = false,
  placeholder,
  data,
}) => {
  return (
    <SelectField
      value={undefined}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full"
      onClear={() => onSelect(undefined)}
      onSelect={({ value }) => {
        onSelect(value);
      }}
      data={data?.map((v) => ({
        value: v,
        label:
          v.clearance_name +
          (v.payment_required ? ` - N${v.fee?.toLocaleString()}` : ''),
        id: v._id!,
      }))}
      onSearch={(search) => {
        return (
          data
            ?.filter((cl) =>
              cl?.clearance_name
                ?.toLowerCase()
                .includes(search?.toLowerCase() ?? '')
            )
            .map((v) => ({
              value: v,
              label:
                v.clearance_name +
                (v.payment_required ? ` - N${v.fee?.toLocaleString()}` : ''),
              id: v._id!,
            })) ?? []
        );
      }}
    />
  );
};

export default SelectClearance;
