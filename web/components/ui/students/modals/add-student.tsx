'use client';
import Button from '@/components/common/button';
import TextField from '@/components/common/input/text-field';
import Modal from '@/components/common/modal';
import SelectCollege from '@/components/common/select-fields/select-college';
import SelectDepartment from '@/components/common/select-fields/select-department';
import { DEFAULT_MATCHERS } from '@/lib/constants';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { College, Department } from '@/lib/schemas/types';
import schoolService from '@/lib/services/school.service';
import studentService from '@/lib/services/student.service';
import { errorHandler } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';

type Inputs = {
  department?: Department;
  matricNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  college?: College;
};

interface Props {
  onSuccess(): void;
}

const AddStudentModal: FC<Props> = ({ onSuccess }) => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const [college, department] = watch(['college', 'department']);

  const { hideModal } = useModal();

  const { data: colleges, isLoading: gettingColleges } = useQuery({
    queryKey: ['useGetColleges'],
    queryFn: async () => await schoolService.getColleges(),
  });

  const {
    data: departments,
    refetch: refetchDepartments,
    isLoading: gettingDepartments,
    isRefetching: refetchingDepartments,
  } = useQuery({
    queryKey: ['useGetDepartment', college?._id],
    queryFn: async () => {
      if (college?._id) {
        return await schoolService.getDepartments(college?._id);
      }
    },
    enabled: !!college,
  });

  const { mutateAsync: createStudent, isPending: creatingStudent } =
    useMutation({
      mutationKey: ['useCreateStudent'],
      mutationFn: studentService.createStudent,
      onSuccess() {
        hideModal();
        onSuccess();
      },
    });

  const submit = async (e: Inputs) => {
    if (!e.college) {
      return errorHandler('Select the college this student belongs to');
    }

    if (!e.department) {
      return errorHandler('Select the department this student belongs to');
    }

    delete e.college;
    await createStudent({ ...e, department: e.department?._id! });
  };

  useEffect(() => {
    //@ts-ignore
    setValue('department', undefined);
    if (college) {
      refetchDepartments();
    }
  }, [college]);

  return (
    <Modal onClose={hideModal}>
      <section className="w-[95vw] max-w-[700px] bg-white p-6 space-y-4">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-[1.1rem]">Add Student</h1>
            <p className="text-[#444] text-[0.8rem]">
              Add student details, they will receive an email with their
              credentials
            </p>
          </div>
          <span>
            <MdClose onClick={hideModal} size={20} />
          </span>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-7">
          <div className="grid grid-cols-2 gap-6">
            <TextField
              label="First Name"
              InputProps={{
                placeholder: 'enter firstname',
                ...register('firstName', {
                  required: {
                    value: true,
                    message: 'this field is required',
                  },
                }),
              }}
              helperText={errors?.firstName?.message}
            />

            <TextField
              label="Last Name"
              InputProps={{
                placeholder: 'enter lastname',
                ...register('lastName', {
                  required: {
                    value: true,
                    message: 'this field is required',
                  },
                }),
              }}
              helperText={errors?.lastName?.message}
            />

            <TextField
              label="Email"
              InputProps={{
                placeholder: 'enter email address',
                ...register('email', {
                  required: {
                    value: true,
                    message: 'this field is required',
                  },
                  pattern: {
                    value: DEFAULT_MATCHERS.email,
                    message: 'enter a valid school email address',
                  },
                }),
              }}
              helperText={errors?.email?.message}
            />

            <TextField
              label="Phone Number"
              InputProps={{
                placeholder: 'enter phone number',
                type: 'number',
                ...register('phoneNumber', {
                  required: {
                    value: true,
                    message: 'this field is required',
                  },
                }),
              }}
              helperText={errors?.phoneNumber?.message}
            />

            <TextField
              label="Matric Number"
              InputProps={{
                placeholder: 'enter matric number',
                ...register('matricNumber', {
                  required: {
                    value: true,
                    message: 'this field is required',
                  },
                }),
              }}
              helperText={errors?.matricNumber?.message}
            />

            <div>
              <p className="text-[.9rem]">College</p>
              <SelectCollege
                // @ts-ignore
                onSelect={(college) => setValue('college', college)}
                colleges={colleges?.data ?? []}
                selected={college}
                loading={gettingColleges}
              />
            </div>

            <div>
              <p className="text-[.9rem]">Department</p>
              <SelectDepartment
                onSelect={(department) => setValue('department', department)}
                departments={departments ?? []}
                selected={department}
                loading={gettingDepartments || refetchingDepartments}
              />
            </div>
          </div>

          <Button
            loading={creatingStudent}
            fullWidth
            variant="filled"
            size="medium"
          >
            Submit
          </Button>
        </form>
      </section>
    </Modal>
  );
};

export default AddStudentModal;
