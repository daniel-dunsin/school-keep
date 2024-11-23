import React, { FC } from 'react';
import SelectField from '../input/select-field';
import { AdminPermissions } from '@/lib/schemas/enums';

interface Props {
  selected?: AdminPermissions;
  onSelect(permission?: AdminPermissions): void;
}

const SelectPermission: FC<Props> = ({ selected, onSelect }) => {
  return (
    <SelectField
      value={selected}
      className="w-full"
      onClear={() => onSelect(undefined)}
      onSelect={({ value }) => {
        onSelect(value);
      }}
      data={Object.values(AdminPermissions).map((v) => ({
        value: v,
        label: v,
        id: v,
      }))}
      onSearch={(search) => {
        return Object.values(AdminPermissions)
          .filter((permission) =>
            permission.toLowerCase().includes(search?.toLowerCase() ?? '')
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

export default SelectPermission;
