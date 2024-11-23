'use client';
import Button from '@/components/common/button';
import CircleLoader from '@/components/common/loader';
import schoolService from '@/lib/services/school.service';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'next/navigation';
import React from 'react';
import DepartmentDetailsHeader from './header';
import Tabs from '@/components/common/tabs';
import StudentsTable from '../../tables/students';
import AdminsTable from '../../tables/admins';

const DepartmentDetails = () => {
  const { id: departmentId } = useParams();

  const { data: department, isLoading: gettingDepartment } = useQuery({
    queryKey: ['useGetDepartment', departmentId],
    queryFn: () => schoolService.getDepartment(departmentId as string),
  });

  if (gettingDepartment) {
    return (
      <>
        <CircleLoader loadingText="Loading" />
      </>
    );
  }

  return (
    <section className="mt-6">
      <DepartmentDetailsHeader department={department!} />

      <Tabs
        tabs={[
          {
            header: 'Students',
            widget: (
              <StudentsTable
                students={department?.students ?? []}
                showFull={false}
              />
            ),
          },
          {
            header: 'Admins',
            widget: (
              <AdminsTable admins={department?.admins ?? []} showFull={false} />
            ),
          },
        ]}
      />
    </section>
  );
};

export default DepartmentDetails;
