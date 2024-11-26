'use client';
import Button from '@/components/common/button';
import ImagePreview from '@/components/common/image/image-preview';
import FileUploader from '@/components/common/input/file-uploader';
import TextField from '@/components/common/input/text-field';
import SelectAnnouncementDestionation from '@/components/common/select-fields/select-announcement-destination';
import SelectCollege from '@/components/common/select-fields/select-college';
import SelectDepartment from '@/components/common/select-fields/select-department';
import { useAuthContext } from '@/lib/providers/contexts/auth-context';
import { AdminPermissions, AnnouncementDestination } from '@/lib/schemas/enums';
import { CreateAnnouncementDto } from '@/lib/schemas/interfaces';
import { College, Department } from '@/lib/schemas/types';
import announcementService from '@/lib/services/announcement.service';
import schoolService from '@/lib/services/school.service';
import { errorHandler } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { add, isAfter, isBefore, startOfToday } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Input = {
  image?: File;
  title: string;
  destination_type: AnnouncementDestination;
  college?: College;
  department?: Department;
  start_date?: Date;
  end_date?: Date;
  content: string;
};

const CreateAnnouncement = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      start_date: new Date(),
      end_date: add(new Date(), { days: 1 }),
      destination_type: user?.admin?.department
        ? AnnouncementDestination.Departments
        : AnnouncementDestination.General,
    },
  });

  const isSuperAdmin = useMemo(
    () => user?.admin?.permission === AdminPermissions.SuperAdmin,
    [user]
  );

  const [
    formImage,
    college,
    department,
    destination_type,
    start_date,
    end_date,
  ] = watch([
    'image',
    'college',
    'department',
    'destination_type',
    'start_date',
    'end_date',
  ]);

  const { data: departments = [], isLoading: gettingDepartments } = useQuery({
    queryKey: ['useGetAllDepartments'],
    queryFn: schoolService.getAllDepartments,
  });

  const { data: colleges, isLoading: gettingColleges } = useQuery({
    queryKey: ['useGetColleges'],
    queryFn: async () => await schoolService.getColleges(),
  });

  const { mutateAsync: createAnnouncement, isPending: creatingAnnouncement } =
    useMutation({
      mutationKey: ['useCreateAnnouncement'],
      mutationFn: announcementService.createAnnouncement,
      onSuccess(data) {
        toast.success('Announcement created');
        router.replace('/dashboard/announcements');
      },
    });

  const submit = async (e: Input) => {
    if (e.destination_type === AnnouncementDestination.Colleges && !e.college) {
      return errorHandler('Select college');
    }

    if (
      e.destination_type === AnnouncementDestination.Departments &&
      !e.department
    ) {
      return errorHandler('Select department');
    }

    const data: CreateAnnouncementDto = {
      image: e.image,
      start_date: e.start_date,
      end_date: e.end_date,
      title: e.title,
      content: e.content,
      destination_type: e.destination_type,
      ...(e.destination_type === AnnouncementDestination.Colleges && {
        colleges: [e.college?._id!],
      }),
      ...(e.destination_type === AnnouncementDestination.Departments && {
        departments: [e.department?._id!],
      }),
    };

    await createAnnouncement(data);
  };

  return (
    <section className="pb-10">
      <h1 className="font-semibold">Add Announcement</h1>

      <form
        onSubmit={handleSubmit(submit)}
        className="max-w-[600px] grid grid-cols-2 mt-5 gap-x-5 gap-y-4"
      >
        <div className="h-[250px] col-span-2 cursor-pointer">
          {formImage ? (
            <ImagePreview
              alt="new announcemnt image"
              image={formImage}
              onRemove={() => setValue('image', undefined)}
            />
          ) : (
            //@ts-ignore
            <FileUploader onUpload={(image) => setValue('image', image)} />
          )}
        </div>

        <TextField
          label="Title"
          InputProps={{
            placeholder: 'enter title',
            ...register('title', {
              required: {
                value: true,
                message: 'title is required',
              },
            }),
          }}
          helperText={errors?.title?.message}
        />

        <div>
          <p className="text-[.9rem] mb-[5px]">Destination</p>
          <SelectAnnouncementDestionation
            disabled={!isSuperAdmin}
            selected={destination_type}
            onSelect={(destination_type) =>
              //@ts-ignore
              setValue('destination_type', destination_type!)
            }
          />
        </div>

        {isSuperAdmin &&
          destination_type === AnnouncementDestination.Colleges && (
            <div>
              <p className="text-[.9rem] mb-[5px]">Colleges</p>
              <SelectCollege
                loading={gettingColleges}
                colleges={colleges?.data ?? []}
                selected={college}
                onSelect={(college) => {
                  // @ts-ignore
                  setValue('college', college);
                }}
              />
            </div>
          )}

        {isSuperAdmin &&
          destination_type === AnnouncementDestination.Departments && (
            <div>
              <p className="text-[.9rem] mb-[5px]">Department</p>
              <SelectDepartment
                loading={gettingDepartments}
                departments={departments}
                selected={department}
                onSelect={(dept) => {
                  // @ts-ignore
                  setValue('department', dept);
                }}
              />
            </div>
          )}

        <TextField
          label="Start Date"
          InputProps={{
            type: 'date',
            // @ts-ignore
            ...register('start_date', {
              validate(value) {
                if (!value) {
                  return 'start date is required';
                }
                if (isBefore(new Date(value), startOfToday())) {
                  return 'start date cannot be less than today';
                }
                if (end_date && isAfter(new Date(value), new Date(end_date))) {
                  return 'start date cannot be after end date';
                }
              },
            }),
          }}
          helperText={errors?.start_date?.message}
        />

        <TextField
          label="End Date"
          InputProps={{
            type: 'date',
            ...register('end_date', {
              validate(value) {
                if (!value) {
                  return 'end date is required';
                }
                if (isBefore(new Date(value), startOfToday())) {
                  return 'end date cannot be less than today';
                }

                if (
                  start_date &&
                  isBefore(new Date(value), new Date(start_date))
                ) {
                  return 'end date cannot be before start date';
                }
              },
            }),
          }}
          helperText={errors?.end_date?.message}
        />

        <TextField
          label="Content"
          className="col-span-2"
          multiline
          InputProps={{
            className: 'h-[200px]',
            placeholder: 'enter announcement content',
            ...register('content'),
          }}
        />

        <Button
          loading={creatingAnnouncement}
          fullWidth
          className="col-span-2"
          variant="filled"
          size="large"
        >
          Submit
        </Button>
      </form>
    </section>
  );
};

export default CreateAnnouncement;
