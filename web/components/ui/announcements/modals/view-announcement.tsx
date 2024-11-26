'use client';
import Button from '@/components/common/button';
import ListTile from '@/components/common/list-tile';
import Modal from '@/components/common/modal';
import { useModal } from '@/lib/providers/contexts/modal-context';
import {
  AnnouncementDestination,
  AnnouncementStatus,
} from '@/lib/schemas/enums';
import { Announcement } from '@/lib/schemas/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { FC } from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
  announcement: Announcement;
}

export const ViewAnnouncement: FC<Props> = ({ announcement }) => {
  const { hideModal } = useModal();

  const renderDestination = () => {
    switch (announcement.destination_type) {
      case AnnouncementDestination.Colleges:
        const college = announcement.colleges[0];
        return <ListTile leadingImage={college.logo} title={college.name} />;
      case AnnouncementDestination.Departments:
        const department = announcement.departments[0];
        return (
          <ListTile leadingImage={department.logo} title={department.name} />
        );
      case AnnouncementDestination.General:
        return <p>All Students</p>;
    }
  };

  return (
    <Modal onClose={hideModal}>
      <section className="w-[95vw] max-w-[700px] bg-white p-6 space-y-4">
        <div className="flex items-center justify-end">
          <MdClose onClick={hideModal} size={25} cursor={'pointer'} />
        </div>

        <div className="mt-3 space-y-3">
          {announcement.image && (
            <Image
              src={announcement.image}
              alt={announcement.title + ' Image'}
              width={1000}
              height={1000}
              className="w-full h-[250px] object-contain"
            />
          )}

          <h1 className="text-[1.2rem] text-center">{announcement.title}</h1>

          {announcement.content && (
            <p className="text-[.9rem] text-center">{announcement.content}</p>
          )}

          <div className="flex items-center justify-center gap-3">
            {renderDestination()}
            <p
              className={cn(
                'px-2 py-1 rounded-sm uppercase text-[.8rem] text-white max-w-fit cursor-pointer',
                announcement.status === AnnouncementStatus.Active &&
                  'bg-success',
                announcement.status === AnnouncementStatus.Inactive &&
                  'bg-red-600'
              )}
            >
              {announcement.status}
            </p>
          </div>
        </div>
      </section>
    </Modal>
  );
};
