import React, { FC } from 'react';
import SelectField from '../input/select-field';
import { StudentStatus } from '@/lib/schemas/enums';

interface Props {
  selected?: StudentStatus;
  onSelect(status?: StudentStatus): void;
}

const SelectStudentStatus: FC<Props> = ({ selected, onSelect }) => {
  return (
    <SelectField
      value={selected}
      className="w-full"
      onClear={() => onSelect(undefined)}
      onSelect={({ value }) => {
        onSelect(value);
      }}
      data={Object.values(StudentStatus).map((v) => ({
        value: v,
        label: v,
        id: v,
      }))}
      onSearch={(search) => {
        return Object.values(StudentStatus)
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

export default SelectStudentStatus;
