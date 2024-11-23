'use client';
import Button from '@/components/common/button';
import TextField from '@/components/common/input/text-field';
import Modal from '@/components/common/modal';
import SelectCollege from '@/components/common/select-fields/select-college';
import SelectDepartment from '@/components/common/select-fields/select-department';
import SelectPermission from '@/components/common/select-fields/select-permission';
import { DEFAULT_MATCHERS } from '@/lib/constants';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { AdminPermissions } from '@/lib/schemas/enums';
import { College, Department } from '@/lib/schemas/types';
import adminService from '@/lib/services/admins.service';
import schoolService from '@/lib/services/school.service';
import { errorHandler } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';

type Inputs = {
  department?: Department;
  permission?: AdminPermissions;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  college?: College;
};

const AddAdminModal = () => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      permission: AdminPermissions.SuperAdmin,
    },
  });
  const [permission, college, department] = watch([
    'permission',
    'college',
    'department',
  ]);

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

  const { mutateAsync: createAdmin, isPending: creatingAdmin } = useMutation({
    mutationKey: ['useCreateAdmin'],
    mutationFn: adminService.createAdmin,
    onSuccess() {
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes('useGetAllAdmins');
        },
      });
      hideModal();
    },
  });

  const submit = async (e: Inputs) => {
    if (!e.permission) {
      return errorHandler('Select Role Type');
    }

    if (e.permission == AdminPermissions.Admin) {
      if (!e.college) {
        return errorHandler('Select the college this sub-admin belongs to');
      }

      if (!e.department) {
        return errorHandler('Select the department this sub-admin belongs to');
      }
    }

    delete e.college;
    await createAdmin({
      ...e,
      department: e.department?._id!,
      permission: e.permission!,
    });
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
            <h1 className="text-[1.1rem]">Add Admin</h1>
            <p className="text-[#444] text-[0.8rem]">
              Add admin details, they will receive an email with their
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

            <div>
              <p className="text-[.9rem]">Role Type</p>
              <SelectPermission
                selected={permission}
                // @ts-ignore
                onSelect={(permission) => {
                  setValue('permission', permission);
                  setValue('college', undefined);
                  setValue('department', undefined);
                }}
              />
            </div>

            {permission == AdminPermissions.Admin && (
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
            )}

            {permission == AdminPermissions.Admin && (
              <div>
                <p className="text-[.9rem]">Department</p>
                <SelectDepartment
                  onSelect={(department) => setValue('department', department)}
                  departments={departments ?? []}
                  selected={department}
                  loading={gettingDepartments || refetchingDepartments}
                />
              </div>
            )}
          </div>

          <Button
            loading={creatingAdmin}
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

export default AddAdminModal;
