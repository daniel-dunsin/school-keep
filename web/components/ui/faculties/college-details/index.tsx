'use client';
import Button from '@/components/common/button';
import CircleLoader from '@/components/common/loader';
import schoolService from '@/lib/services/school.service';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import CollegeDetailsHeader from './header';
import DepartmentsTable from '../../tables/departments';

const CollegeDetails = () => {
  const { id: collegeId } = useParams();
  const { isLoading: gettingCollege, data: college } = useQuery({
    queryKey: ['useGetCollege', collegeId],
    queryFn: () => schoolService.getCollege(collegeId as string),
  });

  const { isLoading: gettingDepartments, data: departments } = useQuery({
    queryKey: ['useGetDepartments', collegeId],
    queryFn: () => schoolService.getDepartments(collegeId as string),
  });

  if (gettingCollege) {
    return (
      <>
        <CircleLoader loadingText="Loading" />
      </>
    );
  }

  return (
    <section>
      <CollegeDetailsHeader college={college} />
      <DepartmentsTable loading={gettingDepartments} data={departments ?? []} />
    </section>
  );
};

export default CollegeDetails;
