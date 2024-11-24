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
import SelectDepartment from '@/components/common/select-fields/select-department';
import SelectPermission from '@/components/common/select-fields/select-permission';
import AddAdminModal from './modals/add-admin';

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
          onClick={() =>
            showModal(<AddAdminModal onSuccess={() => getAllAdmins(query)} />)
          }
        >
          Add Admin
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="max-w-[250px]">
          <SelectDepartment
            loading={gettingDepartments}
            departments={departments}
            selected={query?.department}
            onSelect={(dept) => {
              changeQuery('department', dept);
            }}
          />
        </div>
        <div className="max-w-[250px]">
          <SelectPermission
            selected={query?.permission}
            onSelect={(value) => {
              changeQuery('permission', value);
            }}
          />
        </div>
      </div>

      <div className="mt-6">
        <AdminsTable admins={data} loading={gettingAdmins} />
      </div>
    </section>
  );
};

export default AdminManagement;
