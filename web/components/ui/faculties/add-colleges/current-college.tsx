'use client';
import Button from '@/components/common/button';
import FileUploader from '@/components/common/input/file-uploader';
import TextField from '@/components/common/input/text-field';
import { useCreateCollegeContext } from '@/lib/providers/contexts/create-college-context';
import { errorHandler } from '@/lib/utils';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';

type Inputs = {
  name: string;
  unionName: string;
  logo?: File;
};

const CurrentCollege = () => {
  const {
    college,
    collegeIndex,
    createCollege,
    updateCollege,
    colleges,
    apiCreatingColleges,
  } = useCreateCollegeContext();

  const {
    setValue,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setValue('name', college?.name);
    setValue('logo', college?.logo as File);
    setValue('unionName', college?.unionName);
  }, [collegeIndex]);

  const formLogo = watch('logo');

  const submit = async (e: Inputs) => {
    if (!formLogo) {
      return errorHandler('Select college logo');
    }

    updateCollege('logo', e.logo);
    updateCollege('name', e.name);
    updateCollege('unionName', e.unionName);

    if (collegeIndex == colleges.length - 1) {
      createCollege();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mt-6 max-w-[600px] space-y-4"
    >
      <div className="flex items-start gap-4">
        <TextField
          className="flex-1"
          label="College Name"
          InputProps={{
            placeholder: 'Enter college name',
            ...register('name', {
              required: {
                value: true,
                message: 'College name is required',
              },
            }),
          }}
          helperText={errors?.name?.message}
        />
        <TextField
          className="flex-1"
          label="College Acronym"
          InputProps={{
            placeholder: 'Enter college acronym',
            ...register('unionName', {
              required: {
                value: true,
                message: 'College acronym is required',
              },
            }),
          }}
          helperText={errors?.unionName?.message}
        />
      </div>

      <div className="w-full h-[250px] bg-white">
        {formLogo ? (
          <div className="relative w-full h-full">
            <Image
              width={1000}
              height={250}
              src={URL.createObjectURL(formLogo)}
              alt={college?.name}
              className="h-full w-full object-contain"
            />
            <div className="absolute bg-black/50 w-full h-full top-0 left-0">
              <span className="absolute top-[30px] right-[30px]">
                <IoMdCloseCircleOutline
                  color="white"
                  size={30}
                  cursor={'pointer'}
                  onClick={() => setValue('logo', undefined)}
                />
              </span>
            </div>
          </div>
        ) : (
          <FileUploader
            onUpload={(file) => {
              setValue('logo', file);
            }}
          />
        )}
      </div>

      <div className="flex justify-end">
        <Button variant="filled" disabled={true}>
          Save College
        </Button>
      </div>
    </form>
  );
};

export default CurrentCollege;
