import ConfirmationModal from '@/components/common/modal/confirmation-modal';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { Department, SchoolClearance } from '@/lib/schemas/types';
import clearanceService from '@/lib/services/clearance.service';
import { useMutation } from '@tanstack/react-query';
import { EditIcon, TrashIcon } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import SetDepartmentRequiredClearance from '../../clearance/school/modals/set-department-clearance';

interface Props {
  clearance: SchoolClearance;
}

export const ClearanceTableActions: FC<Props> = ({ clearance }) => {
  const { hideModal, showModal } = useModal();

  const { mutateAsync: deleteClearance } = useMutation({
    mutationKey: ['useDeleteClearance'],
    mutationFn: () => clearanceService.deleteSchoolClearance(clearance._id!),
    onSuccess(data) {
      toast.success('Clearance deleted successfully');
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey.includes('useGetClearance');
        },
      });
      hideModal();
    },
  });

  return (
    <TrashIcon
      className="text-red-600"
      size={20}
      cursor={'pointer'}
      onClick={() =>
        showModal(
          <ConfirmationModal
            title="Delete Clearance"
            subtitle="Are you sure you want to delete this clearance document?"
            onYes={deleteClearance}
            onNo={hideModal}
          />
        )
      }
    />
  );
};

interface DepartmentClearanceTableProps {
  department: Department;
}

export const DepartmentClearanceTableActions: FC<
  DepartmentClearanceTableProps
> = ({ department }) => {
  const { showModal } = useModal();

  return (
    <EditIcon
      size={20}
      className="text-mainLight cursor-pointer"
      onClick={() => {
        showModal(<SetDepartmentRequiredClearance department={department} />);
      }}
    />
  );
};
