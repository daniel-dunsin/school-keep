'use client';
import Button from '@/components/common/button';
import TextField from '@/components/common/input/text-field';
import { queryClient } from '@/lib/providers';
import clearanceService from '@/lib/services/clearance.service';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { FC, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

interface Props {
  showReject: boolean;
  showAccept: boolean;
}

const ActionButtons: FC<Props> = ({ showReject, showAccept }) => {
  const { studentId } = useParams();
  const [showReasonInput, setShowReasonInput] = useState<boolean>();
  const [rejectionReason, setRejectionReason] = useState<string>('');

  const { mutateAsync: _rejectClearance, isPending: _rejectingClearance } =
    useMutation({
      mutationKey: ['rejectClearance'],
      mutationFn: (rejectionReason: string) =>
        clearanceService.rejectClearance(studentId as string, rejectionReason),
      onSuccess() {
        toast.success('Clearance rejected successfully');
        queryClient.invalidateQueries({
          predicate({ queryKey }) {
            return (
              queryKey.includes('clearance') && queryKey.includes('students')
            );
          },
        });
        setRejectionReason('');
        setShowReasonInput(false);
      },
    });

  const { mutateAsync: _acceptClearance, isPending: _acceptingClearance } =
    useMutation({
      mutationKey: ['acceptClearance'],
      mutationFn: () => clearanceService.approveClearance(studentId as string),
      onSuccess() {
        toast.success('Clearance approved successfully');
        queryClient.invalidateQueries({
          predicate({ queryKey }) {
            return (
              queryKey.includes('clearance') && queryKey.includes('students')
            );
          },
        });
        setRejectionReason('');
        setShowReasonInput(false);
      },
    });

  return (
    <div className="flex items-center gap-4 justify-end !mt-10">
      <div className="">
        {showReasonInput && (
          <div className="bg-white relative">
            <TextField
              multiline={true}
              InputProps={{
                className: 'w-[90vw] max-w-[300px] mx-auto rounded-md',
                placeholder: 'Enter Reason...',
                value: rejectionReason,
                onChange(e) {
                  setRejectionReason(e.target.value);
                },
              }}
            />

            <div
              className={cn(
                'w-[30px] h-[30px] bg-mainLight text-white text-[1.2rem] rounded-full grid place-items-center absolute bottom-2 right-2 z-[20] cursor-pointer border-gray-300 border-2',
                _rejectingClearance && 'animate-spin cursor-not-allowed'
              )}
              onClick={() => {
                if (!_rejectingClearance) {
                  _rejectClearance(rejectionReason);
                }
              }}
            >
              {_rejectingClearance ? <BiLoaderAlt /> : <ArrowRight />}
            </div>

            <div
              className="absolute -top-8 right-0 bg-mainLight w-[30px] h-[30px] rounded-full text-white grid place-items-center cursor-pointer"
              onClick={() => setShowReasonInput(false)}
            >
              <MdClose size={20} />
            </div>
          </div>
        )}
        {showReject && !showReasonInput && (
          <Button
            onClick={() => setShowReasonInput(true)}
            variant="destructive"
            size="medium"
          >
            Reject Clearance
          </Button>
        )}
      </div>

      {showAccept && !showReasonInput && (
        <Button
          variant="success"
          size="medium"
          disabled={_rejectingClearance || _acceptingClearance}
          loading={_acceptingClearance}
          onClick={() => _acceptClearance()}
        >
          Approve Clearance
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
