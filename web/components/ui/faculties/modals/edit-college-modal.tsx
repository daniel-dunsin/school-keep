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

interface Props {
  college: College;
}

type Inputs = {
  name: string;
  unionName: string;
  logo?: File;
};

const EditCollegeModal: FC<Props> = ({ college }) => {
  const { hideModal } = useModal();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: college?.name,
      unionName: college?.unionName,
    },
  });
  const { mutateAsync: updateCollege, isPending: updatingCollege } =
    useMutation({
      mutationKey: ['useEditCollege'],
      mutationFn: (e: Inputs) => schoolService.updateCollege(e, college._id),
      onSuccess() {
        hideModal();
        queryClient.invalidateQueries({
          predicate(query) {
            return (
              query?.queryKey.includes('useGetCollege') &&
              query?.queryKey?.includes(college._id)
            );
          },
        });
      },
    });

  const formLogo = watch('logo');

  const submit = (e: Inputs) => {
    updateCollege(e);
  };

  return (
    <Modal onClose={hideModal}>
      <section className="w-[95vw] max-w-[500px] bg-white p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[1.2rem]">Edit College</h1>
          <MdClose onClick={hideModal} size={25} cursor={'pointer'} />
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="flex items-start gap-x-3">
            <TextField
              className="flex-1"
              label="College Name"
              InputProps={{
                placeholder: 'Enter college name',
                ...register('name', {
                  required: {
                    value: true,
                    message: 'college name is required',
                  },
                }),
              }}
              helperText={errors?.name?.message}
            />

            <TextField
              className="flex-1"
              label="College Acronym"
              InputProps={{
                placeholder: 'Enter college aronymn',
                ...register('unionName', {
                  required: {
                    value: true,
                    message: 'college acronym is required',
                  },
                }),
              }}
              helperText={errors?.unionName?.message}
            />
          </div>

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
            loading={updatingCollege}
            variant="filled"
            size="large"
            fullWidth={true}
          >
            Edit College
          </Button>
        </form>
      </section>
    </Modal>
  );
};

export default EditCollegeModal;
