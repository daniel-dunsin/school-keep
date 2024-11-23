import { College } from '@/lib/schemas/types';
import React, { FC } from 'react';
import SelectField from '../input/select-field';
import ListTile from '../list-tile';

interface Props {
  colleges: College[];
  loading: boolean;
  onSelect(college?: College): void;
  selected?: College;
}

const SelectCollege: FC<Props> = ({
  colleges,
  loading,
  onSelect,
  selected,
}) => {
  return (
    <SelectField
      loading={loading}
      className="w-full"
      data={colleges?.map((college) => ({
        label: <ListTile title={college?.name} leadingImage={college?.logo} />,
        value: college,
        id: college._id,
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
          return colleges?.map((college) => ({
            label: (
              <ListTile title={college?.name} leadingImage={college?.logo} />
            ),
            value: college,
            id: college._id,
          }));
        }

        if (colleges) {
          return colleges
            .filter(
              (college) =>
                college.name.toLowerCase().includes(search?.toLowerCase()!) ||
                college.unionName.toLowerCase().includes(search?.toLowerCase()!)
            )
            .map((college) => {
              return {
                label: (
                  <ListTile
                    title={college?.name}
                    leadingImage={college?.logo}
                  />
                ),
                value: college,
                id: college._id,
              };
            });
        }
        return [];
      }}
    />
  );
};

export default SelectCollege;
