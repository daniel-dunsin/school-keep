'use client';
import React, { useEffect, useState } from 'react';
import TotalDepartments from './total-departments';
import TotalColleges from './total-colleges';
import SearchField from '@/components/common/input/search';
import Button from '@/components/common/button';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import schoolService from '@/lib/services/school.service';
import CollegeTable from '../tables/colleges';
import { College } from '@/lib/schemas/types';

const Faculties = () => {
  const router = useRouter();
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState<string>('');
  const [collegesCount, setCollegesCount] = useState<number | undefined>();
  const [departmentsCount, setDepartmentsCount] = useState<
    number | undefined
  >();

  const {
    data,
    isPending: gettingColleges,
    mutateAsync: getColleges,
  } = useMutation({
    mutationKey: ['useGetCollege'],
    mutationFn: schoolService.getColleges,
  });

  useEffect(() => {
    getColleges(search);
  }, [search]);

  useEffect(() => {
    if (data) {
      setColleges(data?.data ?? []);
      setCollegesCount(data?.meta?.totalColleges);
      setDepartmentsCount(data?.meta?.totalDepartments);
    }
  }, [data]);

  return (
    <section className="mt-6">
      <div className="space-x-5 flex items-center">
        <TotalColleges colleges={collegesCount!} />
        <TotalDepartments departments={departmentsCount!} />
      </div>
      <div className="my-8 flex gap-3">
        <SearchField
          onSearch={(search) => {
            setSearch(search ?? '');
          }}
          InputProps={{ placeholder: 'Search Colleges' }}
        />
        <Button
          size="small"
          variant="filled"
          className="w-[150px] flex items-center justify-center"
          onClick={() => router.push('/dashboard/faculties/add-colleges')}
        >
          Add Colleges
        </Button>
      </div>

      <CollegeTable data={colleges} gettingColleges={gettingColleges} />
    </section>
  );
};

export default Faculties;
