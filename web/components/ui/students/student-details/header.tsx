'use client';
import ListTile from '@/components/common/list-tile';
import ConfirmationModal from '@/components/common/modal/confirmation-modal';
import SelectStudentStatus from '@/components/common/select-fields/select-student-status';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { StudentStatus } from '@/lib/schemas/enums';
import { Student } from '@/lib/schemas/types';
import studentService from '@/lib/services/student.service';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React, { FC } from 'react';
import { toast } from 'sonner';

interface Props {
  student: Student;
}

const StudentDetailsHeader: FC<Props> = ({ student }) => {
  const { showModal, hideModal } = useModal();

  const { mutateAsync: updateStudentStatus, isPending: updatingStudentStatus } =
    useMutation({
      mutationKey: ['useUpdateStudentStatus', student._id],
      mutationFn: (status: StudentStatus) =>
        studentService.updateStudentStatus(student._id, status),
      onSuccess() {
        toast.success('Status updated');
        queryClient.invalidateQueries({
          predicate(query) {
            return (
              query.queryKey.includes('useGetStudent') &&
              query.queryKey.includes(student._id)
            );
          },
        });
        hideModal();
      },
    });

  return (
    <header className="flex items-center gap-3 justify-between">
      <div className="flex items-center gap-x-3">
        <Image
          src={student?.user?.profilePicture!}
          alt={student?.user?.firstName!}
          width={1000}
          height={1000}
          className="w-[150px] h-[150px] object-cover object-center rounded-full border-2"
        />

        <div>
          <h1 className="font-semibold text-[1.3rem]">
            {student?.user?.firstName} {student.user?.lastName}
          </h1>
          <p>{student?.matricNumber}</p>
          <p className="flex items-center gap-2 text-[.8rem]">
            Department -{' '}
            <span className="inline gap-2  items-center">
              <ListTile
                title={student?.department?.name!}
                leadingImage={student?.department?.logo!}
              />
            </span>
          </p>
        </div>
      </div>

      <div>
        <SelectStudentStatus
          onSelect={(status) => {
            if (status) {
              showModal(
                <ConfirmationModal
                  title="Update Student Status"
                  subtitle={`Are you sure you want to update this student status to ${status}`}
                  loading={updatingStudentStatus}
                  onYes={() => updateStudentStatus(status!)}
                  onNo={hideModal}
                />
              );
            }
          }}
          selected={student.status}
        />
      </div>
    </header>
  );
};

export default StudentDetailsHeader;
