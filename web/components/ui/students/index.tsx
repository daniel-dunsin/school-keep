'use client';
import Button from '@/components/common/button';
import SearchField from '@/components/common/input/search';
import SelectDepartment from '@/components/common/select-fields/select-department';
import { useApiQuery } from '@/lib/hooks/use-query';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { GetStudentsQuery } from '@/lib/schemas/interfaces';
import { Student } from '@/lib/schemas/types';
import studentService from '@/lib/services/student.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import StudentsTable from '../tables/students';
import schoolService from '@/lib/services/school.service';
import AddStudentModal from './modals/add-student';

const StudentsManagement = () => {
  const { showModal } = useModal();
  const [data, setData] = useState<Student[]>([]);

  const { mutateAsync: getAllStudents, isPending: gettingStudents } =
    useMutation({
      mutationKey: ['useGetAllStudents'],
      mutationFn: studentService.getAllStudents,
      onSuccess(data) {
        if (data) {
          setData(data);
        }
      },
    });

  const { query, changeQuery } = useApiQuery<GetStudentsQuery>({
    defaultValues: {
      search: '',
    },
    onChangeQuery(query) {
      getAllStudents(query);
    },
  });

  const { data: departments = [], isLoading: gettingDepartments } = useQuery({
    queryKey: ['useGetAllDepartments'],
    queryFn: schoolService.getAllDepartments,
  });

  return (
    <section>
      <div className="my-8 flex gap-3">
        <SearchField
          onSearch={(search) => {
            changeQuery('search', search);
          }}
          InputProps={{ placeholder: 'Search Students' }}
        />

        <Button
          size="small"
          variant="filled"
          className="w-[150px] flex items-center justify-center"
          onClick={() =>
            showModal(
              <AddStudentModal onSuccess={() => getAllStudents(query)} />
            )
          }
        >
          Add Student
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
      </div>

      <div className="mt-6">
        <StudentsTable students={data} loading={gettingStudents} />
      </div>
    </section>
  );
};

export default StudentsManagement;
