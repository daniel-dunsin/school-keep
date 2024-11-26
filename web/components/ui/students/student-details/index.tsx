'use client';
import CircleLoader from '@/components/common/loader';
import studentService from '@/lib/services/student.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import StudentDetailsHeader from './header';
import Tabs from '@/components/common/tabs';
import StudentProfileTab from './profile-tab';
import StudentDocumentsTab from './documents-tab';

const StudentDetails = () => {
  const { id: studentId } = useParams();

  const { data: student, isLoading: studentLoading } = useQuery({
    queryKey: ['useGetStudent', studentId],
    queryFn: () => studentService.getStudent(studentId as string),
    enabled: !!studentId,
  });

  if (studentLoading) {
    return <CircleLoader loadingText="Fetching profile" />;
  }

  return (
    <section>
      <StudentDetailsHeader student={student!} />

      <Tabs
        tabs={[
          {
            header: 'Profile',
            widget: <StudentProfileTab student={student!} />,
          },
          {
            header: 'Documents',
            widget: <StudentDocumentsTab />,
          },
        ]}
      />
    </section>
  );
};

export default StudentDetails;
