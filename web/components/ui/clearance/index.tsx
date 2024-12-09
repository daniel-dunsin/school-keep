'use client';
import { ArrowRightCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Clearance = () => {
  const router = useRouter();

  const toSchoolManagement = () => router.push('/dashboard/clearance/school');
  const toStudentsManagement = () =>
    router.push('/dashboard/clearance/student');

  return (
    <section>
      <header className="flex items-center gap-4 mt-5">
        <article className="flex-1 bg-mainExtraLight px-4 py-10">
          <h1>School Clearance Management</h1>

          <ArrowRightCircleIcon
            size={50}
            className="mt-5 ml-auto cursor-pointer"
            onClick={toSchoolManagement}
          />
        </article>
        <article className="flex-1 bg-mainExtraLight px-4 py-10">
          <h1>Students Clearance Management</h1>

          <ArrowRightCircleIcon
            size={50}
            className="mt-5 ml-auto cursor-pointer"
            onClick={toStudentsManagement}
          />
        </article>
      </header>
    </section>
  );
};

export default Clearance;
