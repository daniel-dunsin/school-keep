'use client';
import Button from '@/components/common/button';
import React from 'react';
import SchoolClearanceTabs from './tabs';
import { useModal } from '@/lib/providers/contexts/modal-context';
import AddClearanceModal from './modals/add-clearance-modal';

const SchoolClearance = () => {
  const { showModal } = useModal();

  return (
    <section className="mt-5 space-y-5">
      <div className="max-w-fit ml-auto">
        <Button
          variant="filled"
          onClick={() => showModal(<AddClearanceModal />)}
        >
          Add New Clearance
        </Button>
      </div>

      <SchoolClearanceTabs />
    </section>
  );
};

export default SchoolClearance;
