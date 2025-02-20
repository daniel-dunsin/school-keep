'use client';
import Tabs from '@/components/common/tabs';
import clearanceService from '@/lib/services/clearance.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { StudentClearanceTable } from '../../tables/student-clearance';
import { ClearanceStatus } from '@/lib/schemas/enums';

const StudentClearancePage = () => {
  const { data: overview, isLoading: gettingClearanceOverview } = useQuery({
    queryKey: ['useGetClearanceOverview'],
    queryFn: clearanceService.getClearanceOverview,
  });

  return (
    <section className="mt-5 space-y-5">
      <h1 className="text-[1.5rem]">Students' Clearance Overview</h1>
      <Tabs
        tabs={[
          {
            header: 'Requested',
            widget: (
              <StudentClearanceTable
                data={overview?.requested}
                loading={gettingClearanceOverview}
                tableType={ClearanceStatus.Requested}
              />
            ),
          },
          {
            header: 'Approved',
            widget: (
              <StudentClearanceTable
                data={overview?.approved}
                loading={gettingClearanceOverview}
                tableType={ClearanceStatus.Approved}
              />
            ),
          },
          {
            header: 'Rejected',
            widget: (
              <StudentClearanceTable
                data={overview?.rejected}
                loading={gettingClearanceOverview}
                tableType={ClearanceStatus.Rejected}
              />
            ),
          },
          {
            header: 'Completed',
            widget: (
              <StudentClearanceTable
                data={overview?.completed}
                loading={gettingClearanceOverview}
                tableType={ClearanceStatus.Completed}
              />
            ),
          },
        ]}
      />
    </section>
  );
};

export default StudentClearancePage;
