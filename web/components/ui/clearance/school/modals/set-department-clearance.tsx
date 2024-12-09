import Modal from '@/components/common/modal';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { Department, SchoolClearance } from '@/lib/schemas/types';
import clearanceService from '@/lib/services/clearance.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { FC, useMemo, useState } from 'react';
import { MdClose } from 'react-icons/md';
import ClearanceChip from '../clearance-chip';
import SelectClearance from '@/components/common/select-fields/select-clearance';
import Button from '@/components/common/button';
import { queryClient } from '@/lib/providers';
import { toast } from 'sonner';

interface Props {
  department: Department;
}

const SetDepartmentRequiredClearance: FC<Props> = ({ department }) => {
  const { hideModal } = useModal();

  const { data: clearance, isPending: clearancePending } = useQuery({
    queryKey: ['useGetClearance'],
    queryFn: () => clearanceService?.getSchoolClearance(),
  });

  const [selected, setSelected] = useState<SchoolClearance[]>(
    department?.required_clearance ?? []
  );

  const unselected = useMemo(() => {
    return (
      clearance?.filter(
        (cl) => !selected.find((selected) => selected._id == cl._id)
      ) ?? []
    );
  }, [department, selected, clearance]);

  const { mutateAsync: updateClearance, isPending: isLoading } = useMutation({
    mutationKey: ['useUpdateRequiredClearance'],
    mutationFn: (e: string[]) =>
      clearanceService.setDepartmentRequiredClearance(department._id, e),
    onSuccess(data) {
      toast.success('Department required clearance updated successfully');
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes('useGetDepartmentsClearance');
        },
      });
      hideModal();
    },
  });

  const submit = () => updateClearance(selected?.map((e) => e._id!));

  return (
    <Modal onClose={hideModal}>
      <section className="w-[95vw] max-w-[500px] bg-white p-6 space-y-4">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-[1.1rem]">Set Department Clearance</h1>
          </div>
          <span>
            <MdClose onClick={hideModal} size={20} />
          </span>
        </div>

        <div className="flex items-center overflow-x-scroll space-x-2">
          {selected?.map((s) => (
            <ClearanceChip
              loading={clearancePending}
              clearance={s}
              remove={(id) => {
                setSelected((prev) => prev.filter((cl) => cl._id != id));
              }}
            />
          ))}
        </div>

        <div className="mt-5">
          <SelectClearance
            data={unselected}
            onSelect={(e) => (e ? setSelected([...selected, e]) : () => {})}
            disabled={clearancePending}
            placeholder="Select Clearance"
          />
        </div>

        <Button
          loading={isLoading}
          onClick={submit}
          variant="filled"
          fullWidth
          className="!mt-8"
        >
          Submit
        </Button>
      </section>
    </Modal>
  );
};

export default SetDepartmentRequiredClearance;
