'use client';
import { useModal } from '@/lib/providers/contexts/modal-context';
import React, { FC } from 'react';
import Modal from '.';
import { MdClose } from 'react-icons/md';
import Button from '../button';

interface Props {
  title: string;
  subtitle?: string;
  onYes(): void;
  onNo?(): void;
  loading?: boolean;
}

const ConfirmationModal: FC<Props> = ({
  title,
  subtitle,
  onYes,
  onNo,
  loading,
}) => {
  const { hideModal } = useModal();

  return (
    <Modal
      onClose={() => {
        hideModal();
      }}
    >
      <section className="w-[95vw] max-w-[500px] bg-white p-6 space-y-4">
        <div className="flex justify-end">
          <MdClose cursor={'pointer'} size={25} onClick={hideModal} />
        </div>

        <div>
          <h1 className="text-[2.3rem]">{title}</h1>
          <p className="text-[.9rem] text-[#444]">{subtitle}</p>
        </div>

        <div className="flex justify-end space-x-3 !mt-12">
          <Button loading={loading} onClick={onNo ?? hideModal}>
            Cancel
          </Button>
          <Button variant="filled" onClick={onYes} loading={loading}>
            Confirm
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default ConfirmationModal;
