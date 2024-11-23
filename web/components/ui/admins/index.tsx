'use client';
import Button from '@/components/common/button';
import SearchField from '@/components/common/input/search';
import SelectField from '@/components/common/input/select-field';
import ListTile from '@/components/common/list-tile';
import { useApiQuery } from '@/lib/hooks/use-query';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { AdminPermissions } from '@/lib/schemas/enums';
import { GetAdminsQuery } from '@/lib/schemas/interfaces';
import { Admin, Department } from '@/lib/schemas/types';
import schoolService from '@/lib/services/school.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { permission } from 'process';
import React, { useEffect, useState } from 'react';
import AdminsTable from '../tables/admins';
import adminService from '@/lib/services/admins.service';

const AdminManagement = () => {
  const { showModal } = useModal();
  const [data, setData] = useState<Admin[]>([]);

  const { mutateAsync: getAllAdmins, isPending: gettingAdmins } = useMutation({
    mutationKey: ['useGetAllAdmins'],
    mutationFn: adminService.getAllAdmins,
    onSuccess(data) {
      if (data) {
        setData(data);
      }
    },
  });

  const { query, changeQuery } = useApiQuery<GetAdminsQuery>({
    defaultValues: {
      search: '',
    },
    onChangeQuery(query) {
      getAllAdmins(query);
    },
  });

  const { data: departments = [], isLoading: gettingDepartments } = useQuery({
    queryKey: ['useGetAllDepartments'],
    queryFn: schoolService.getAllDepartments,
  });

  useEffect(() => {
    getAllAdmins(query);
  }, []);

  return (
    <section>
      <div className="my-8 flex gap-3">
        <SearchField
          onSearch={(search) => {
            changeQuery('search', search);
          }}
          InputProps={{ placeholder: 'Search Admins' }}
        />

        <Button
          size="small"
          variant="filled"
          className="w-[150px] flex items-center justify-center"
        >
          Add Admin
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <SelectField
          loading={gettingDepartments}
          className="w-[250px]"
          data={departments?.map((dept) => ({
            label: <ListTile title={dept?.name} leadingImage={dept?.logo} />,
            value: dept,
            id: dept._id,
          }))}
          value={query?.department?.name}
          onSelect={(option) => {
            changeQuery('department', option.value);
          }}
          onClear={() => {
            changeQuery('department', undefined);
          }}
          onSearch={(search) => {
            if (!search) {
              return departments?.map((dept) => ({
                label: (
                  <ListTile title={dept?.name} leadingImage={dept?.logo} />
                ),
                value: dept,
                id: dept._id,
              }));
            }

            if (departments) {
              return departments
                .filter(
                  (dept) =>
                    dept.name.toLowerCase().includes(search?.toLowerCase()!) ||
                    dept.unionName
                      .toLowerCase()
                      .includes(search?.toLowerCase()!)
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

        <SelectField
          value={query?.permission}
          onClear={() => changeQuery('permission', undefined)}
          onSelect={({ value }) => {
            changeQuery('permission', value);
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
      </div>

      <div className="mt-6">
        <AdminsTable admins={data} loading={gettingAdmins} />
      </div>
    </section>
  );
};

export default AdminManagement;
