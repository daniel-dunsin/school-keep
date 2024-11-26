'use client';
import Button from '@/components/common/button';
import ImagePreview from '@/components/common/image/image-preview';
import FileUploader from '@/components/common/input/file-uploader';
import TextField from '@/components/common/input/text-field';
import Modal from '@/components/common/modal';
import SelectAnnouncementDestionation from '@/components/common/select-fields/select-announcement-destination';
import SelectAnnouncementStatus from '@/components/common/select-fields/select-announcement-status';
import SelectCollege from '@/components/common/select-fields/select-college';
import SelectDepartment from '@/components/common/select-fields/select-department';
import { queryClient } from '@/lib/providers';
import { useAuthContext } from '@/lib/providers/contexts/auth-context';
import { useModal } from '@/lib/providers/contexts/modal-context';
import {
  AdminPermissions,
  AnnouncementDestination,
  AnnouncementStatus,
} from '@/lib/schemas/enums';
import { CreateAnnouncementDto } from '@/lib/schemas/interfaces';
import { Announcement, College, Department } from '@/lib/schemas/types';
import announcementService from '@/lib/services/announcement.service';
import schoolService from '@/lib/services/school.service';
import { errorHandler } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isAfter, isBefore, startOfToday } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

interface Props {
  announcement: Announcement;
}

type Input = {
  image?: File;
  title: string;
  destination_type: AnnouncementDestination;
  college?: College;
  department?: Department;
  start_date?: Date;
  end_date?: Date;
  content: string;
  status?: AnnouncementStatus;
};

const EditAnnouncement: FC<Props> = ({ announcement }) => {
  const { user } = useAuthContext();
  const { hideModal } = useModal();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      start_date: announcement.start_date,
      end_date: announcement.end_date,
      department: announcement.departments?.[0],
      college: announcement.colleges?.[0],
      content: announcement.content,
      title: announcement.title,
      destination_type: announcement.destination_type,
      status: announcement.status,
    },
  });

  const [
    formImage,
    college,
    department,
    destination_type,
    start_date,
    end_date,
    status,
  ] = watch([
    'image',
    'college',
    'department',
    'destination_type',
    'start_date',
    'end_date',
    'status',
  ]);

  const isSuperAdmin = useMemo(
    () => user?.admin?.permission === AdminPermissions.SuperAdmin,
    [user]
  );

  const { data: departments = [], isLoading: gettingDepartments } = useQuery({
    queryKey: ['useGetAllDepartments'],
    queryFn: schoolService.getAllDepartments,
  });

  const { data: colleges, isLoading: gettingColleges } = useQuery({
    queryKey: ['useGetColleges'],
    queryFn: async () => await schoolService.getColleges(),
  });

  const { mutateAsync: updateAnnouncement, isPending: updatingAnnouncement } =
    useMutation({
      mutationKey: ['useUpdateAnnouncement'],
      mutationFn: (dto: CreateAnnouncementDto) =>
        announcementService.updateAnnouncement(announcement._id, dto),
      onSuccess(data) {
        toast.success('Announcement updated');
        queryClient.invalidateQueries({
          predicate(query) {
            return query.queryKey.includes('useGetAnnouncements');
          },
        });
        hideModal();
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
      status: e.status,
    };

    await updateAnnouncement(data);
  };

  return (
    <Modal onClose={hideModal}>
      <section className="w-[95vw] max-w-[700px] bg-white p-6 space-y-4 max-h-[90vh] overflow-y-scroll">
        <div className="flex items-center justify-between">
          <h1 className="text-[1.1rem]">Edit Announcement</h1>
          <MdClose onClick={hideModal} size={25} cursor={'pointer'} />
        </div>

        <form
          onSubmit={handleSubmit(submit)}
          className="grid grid-cols-2 mt-5 gap-x-5 gap-y-4"
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
                valueAsDate: true,
                validate(value) {
                  if (!value) {
                    return 'start date is required';
                  }
                  if (isBefore(new Date(value), startOfToday())) {
                    return 'start date cannot be less than today';
                  }
                  if (
                    end_date &&
                    isAfter(new Date(value), new Date(end_date))
                  ) {
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
                valueAsDate: true,
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

          <div className="col-span-2">
            <p className="text-[.9rem] mb-[5px]">Status</p>
            <SelectAnnouncementStatus
              onSelect={(status) => setValue('status', status)}
              selected={status}
            />
          </div>

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
            loading={updatingAnnouncement}
            fullWidth
            className="col-span-2"
            variant="filled"
            size="large"
          >
            Submit
          </Button>
        </form>
      </section>
    </Modal>
  );
};

export default EditAnnouncement;
