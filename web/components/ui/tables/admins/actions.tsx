'use client';
import ConfirmationModal from '@/components/common/modal/confirmation-modal';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { Admin } from '@/lib/schemas/types';
import adminService from '@/lib/services/admins.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';
import { BiTrashAlt } from 'react-icons/bi';

interface Props {
  admin: Admin;
}

const Actions: FC<Props> = ({ admin }) => {
  const { hideModal, showModal } = useModal();
  const router = useRouter();

  const { mutateAsync: deleteAdmin, isPending: deletingAdmin } = useMutation({
    mutationKey: ['useDeleteAdmin'],
    mutationFn: async () => await adminService.deleteAdmin(admin?._id),
    async onSuccess() {
      await queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes('useGetAllAdmins');
        },
      });

      hideModal();
      router.refresh();
    },
  });

  return (
    <div className="flex items-center justify-center">
      <BiTrashAlt
        size={20}
        className="text-red-500"
        cursor={'pointer'}
        onClick={() =>
          showModal(
            <ConfirmationModal
              loading={deletingAdmin}
              onYes={deleteAdmin}
              onNo={hideModal}
              title={'Delete Admin'}
              subtitle={'Are you sure you want to delete this admin account?'}
            />
          )
        }
      />
    </div>
  );
};

export default Actions;
