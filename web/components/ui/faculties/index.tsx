'use client';
import React from 'react';
import TotalDepartments from './total-departments';
import TotalColleges from './total-colleges';
import SearchField from '@/components/common/input/search';
import Button from '@/components/common/button';
import { useRouter } from 'next/navigation';

const Faculties = () => {
  const router = useRouter();

  return (
    <section className="mt-6">
      <div className="space-x-5 flex items-center">
        <TotalColleges />
        <TotalDepartments />
      </div>
      <div className="my-8 flex gap-3">
        <SearchField
          onSearch={() => {}}
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
    </section>
  );
};

export default Faculties;
