'use client';
import Button from '@/components/common/button';
import ImagePreview from '@/components/common/image/image-preview';
import FileUploader from '@/components/common/input/file-uploader';
import TextField from '@/components/common/input/text-field';
import Modal from '@/components/common/modal';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { College } from '@/lib/schemas/types';
import schoolService from '@/lib/services/school.service';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdCancel, MdClose } from 'react-icons/md';
import { toast } from 'sonner';

interface Props {
  college: College;
}

type Inputs = {
  name: string;
  unionName: string;
  logo?: File;
  levelsCount: number;
};

const AddDepartmentModal: FC<Props> = ({ college }) => {
  const { hideModal } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutateAsync: createDepartment, isPending: creatingDepartment } =
    useMutation({
      mutationKey: ['useAddDepartment'],
      mutationFn: (e: Inputs) => schoolService.createDepartment(e, college._id),
      onSuccess() {
        hideModal();
        queryClient.invalidateQueries({
          predicate(query) {
            return (
              query?.queryKey.includes('useGetDepartments') &&
              query?.queryKey?.includes(college._id)
            );
          },
        });
      },
    });

  const formLogo = watch('logo');

  const submit = (e: Inputs) => {
    if (!e.logo) {
      return toast.error('logo is required');
    }
    createDepartment(e);
  };

  return (
    <Modal onClose={hideModal}>
      <section className="w-[95vw] max-w-[500px] bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[1.2rem]">Add Department</h1>
          <MdClose onClick={hideModal} size={25} cursor={'pointer'} />
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="flex items-start gap-x-3">
            <TextField
              className="flex-1"
              label="Department Name"
              InputProps={{
                placeholder: 'Enter department name',
                ...register('name', {
                  required: {
                    value: true,
                    message: 'department name is required',
                  },
                }),
              }}
              helperText={errors?.name?.message}
            />

            <TextField
              className="flex-1"
              label="Department Acronym"
              InputProps={{
                placeholder: 'Enter department aronymn',
                ...register('unionName', {
                  required: {
                    value: true,
                    message: 'department acronym is required',
                  },
                }),
              }}
              helperText={errors?.unionName?.message}
            />
          </div>

          <TextField
            className="flex-1"
            label="Total Levels"
            InputProps={{
              placeholder: 'Enter college aronymn',
              type: 'number',

              ...register('levelsCount', {
                required: {
                  value: true,
                  message: 'levels count is required',
                },
                min: {
                  value: 1,
                  message: 'Levels count can not be less than 1 (100 level)',
                },
                max: {
                  value: 7,
                  message: 'Levels count can not be greater than 7 (700 level)',
                },
              }),
            }}
            helperText={errors?.levelsCount?.message}
          />

          <div>
            <p className="text-[.9rem]">
              Change Logo <span className="text-mainLight">{'(optional)'}</span>
            </p>

            <div className="w-full h-[200px] bg-white mt-2">
              {formLogo ? (
                <ImagePreview
                  image={formLogo}
                  onRemove={() => setValue('logo', undefined)}
                  alt={college?.name}
                />
              ) : (
                <FileUploader
                  onUpload={(file: File) => {
                    setValue('logo', file);
                  }}
                />
              )}
            </div>
          </div>

          <Button
            loading={creatingDepartment}
            variant="filled"
            size="large"
            fullWidth={true}
          >
            Submit
          </Button>
        </form>
      </section>
    </Modal>
  );
};

export default AddDepartmentModal;
