import { Department } from '@/lib/schemas/types';
import React, { FC } from 'react';
import SelectField from '../input/select-field';
import ListTile from '../list-tile';

interface Props {
  departments: Department[];
  loading: boolean;
  onSelect(department?: Department): void;
  selected?: Department;
}

const SelectDepartment: FC<Props> = ({
  departments,
  loading,
  onSelect,
  selected,
}) => {
  return (
    <SelectField
      loading={loading}
      className="w-full"
      data={departments?.map((dept) => ({
        label: <ListTile title={dept?.name} leadingImage={dept?.logo} />,
        value: dept,
        id: dept._id,
      }))}
      value={selected?.name}
      onSelect={(option) => {
        onSelect(option.value);
      }}
      onClear={() => {
        onSelect(undefined);
      }}
      onSearch={(search) => {
        if (!search) {
          return departments?.map((dept) => ({
            label: <ListTile title={dept?.name} leadingImage={dept?.logo} />,
            value: dept,
            id: dept._id,
          }));
        }

        if (departments) {
          return departments
            .filter(
              (dept) =>
                dept.name.toLowerCase().includes(search?.toLowerCase()!) ||
                dept.unionName.toLowerCase().includes(search?.toLowerCase()!)
            )
            .map((dept) => {
              return {
                label: (
                  <ListTile title={dept?.name} leadingImage={dept?.logo} />
                ),
                value: dept,
                id: dept._id,
              };
            });
        }
        return [];
      }}
    />
  );
};

export default SelectDepartment;
