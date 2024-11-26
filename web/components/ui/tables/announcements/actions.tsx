'use client';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { Announcement } from '@/lib/schemas/types';
import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react';
import React, { FC } from 'react';
import { ViewAnnouncement } from '../../announcements/modals/view-announcement';
import { useMutation } from '@tanstack/react-query';
import announcementService from '@/lib/services/announcement.service';
import { toast } from 'sonner';
import { queryClient } from '@/lib/providers';
import ConfirmationModal from '@/components/common/modal/confirmation-modal';
import EditAnnouncement from '../../announcements/modals/edit-announcement';

interface Props {
  announcement: Announcement;
}

const Actions: FC<Props> = ({ announcement }) => {
  const { showModal, hideModal } = useModal();

  const { mutateAsync: deleteAnnouncement, isPending: deletingAnnouncement } =
    useMutation({
      mutationKey: ['useDeleteAnnouncement', announcement._id],
      mutationFn: () =>
        announcementService.deleteAnnouncement(announcement._id),
      onSuccess() {
        toast.success('Announcement deleted');
        queryClient.invalidateQueries({
          predicate(query) {
            return query.queryKey.includes('useGetAnnouncements');
          },
        });
        hideModal();
      },
    });

  return (
    <div className="flex items-center gap-3">
      <EyeIcon
        size={18}
        className="text-mainLight"
        cursor={'pointer'}
        onClick={() =>
          showModal(<ViewAnnouncement announcement={announcement} />)
        }
      />
      <EditIcon
        size={18}
        className="text-success"
        cursor={'pointer'}
        onClick={() =>
          showModal(<EditAnnouncement announcement={announcement} />)
        }
      />
      <TrashIcon
        size={18}
        className="text-red-700"
        cursor={'pointer'}
        onClick={() => {
          showModal(
            <ConfirmationModal
              title="Delete Announcement"
              subtitle="Are you sure you want to delete this announcement"
              onYes={deleteAnnouncement}
              onNo={hideModal}
              loading={deletingAnnouncement}
            />
          );
        }}
      />
    </div>
  );
};

export default Actions;
