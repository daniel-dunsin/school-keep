'use client';
import Button from '@/components/common/button';
import { Checkbox } from '@/components/common/input/checkbox';
import TextField from '@/components/common/input/text-field';
import Modal from '@/components/common/modal';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { SchoolClearance } from '@/lib/schemas/types';
import clearanceService from '@/lib/services/clearance.service';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

type Inputs = Omit<SchoolClearance, '_id'> & { required_documents: string };

const AddClearanceModal = () => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      payment_required: false,
    },
  });
  const { hideModal } = useModal();
  const { mutateAsync: addClearance, isPending: addingClearance } = useMutation(
    {
      mutationKey: ['useAddClearance'],
      mutationFn: clearanceService.addSchoolClearance,
      onSuccess(data) {
        toast.success('Clearance added successfully');
        queryClient.invalidateQueries({
          predicate(query) {
            return query.queryKey.includes('useGetClearance');
          },
        });
        hideModal();
      },
    }
  );

  const feeRequired = watch('payment_required');

  const submit = async (e: Inputs) => {
    addClearance({
      ...e,
      required_documents: e.required_documents?.split(',') ?? [],
    });
  };

  return (
    <Modal onClose={hideModal}>
      <section className="w-[95vw] max-w-[500px] bg-white p-6 space-y-4">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-[1.1rem]">Add Clearance</h1>
            <p className="text-[#444] text-[0.8rem]">
              Add clearance that will be requested from students.
            </p>
          </div>
          <span>
            <MdClose onClick={hideModal} size={20} />
          </span>
        </div>

        <form onSubmit={handleSubmit(submit)} className="mt-5 space-y-5">
          <TextField
            label="Clearance name"
            InputProps={{
              placeholder: 'E.g Library Clearance',
              ...register('clearance_name', {
                required: {
                  value: true,
                  message: 'Clearance name is required',
                },
              }),
            }}
            helperText={errors?.clearance_name?.message}
          />

          <div className="flex items-end space-x-5">
            <div className="flex items-center space-x-2 min-w-fit max-w-fit">
              <Checkbox
                checked={feeRequired}
                onCheckedChange={(e) =>
                  setValue('payment_required', e as boolean)
                }
                id="fee-required"
              />

              <label
                htmlFor="remember-device"
                className="text-[.8rem] inline-block cursor-pointer"
              >
                Paid
              </label>
            </div>

            <div className="flex-1">
              {feeRequired && (
                <TextField
                  label="Fee Amount (N)"
                  InputProps={{
                    type: 'number',
                    ...register('fee', {
                      required: {
                        value: true,
                        message: 'Fee is required for paid clearance',
                      },
                    }),
                  }}
                />
              )}
            </div>
          </div>

          <TextField
            label="Required Documents"
            multiline
            InputProps={{
              placeholder: 'Separate with commas',
              ...register('required_documents', {
                required: false,
              }),
            }}
            helperText={errors?.required_documents?.message}
          />

          <Button
            loading={addingClearance}
            fullWidth
            variant="filled"
            size="medium"
            className="!mt-8"
          >
            Submit
          </Button>
        </form>
      </section>
    </Modal>
  );
};

export default AddClearanceModal;
