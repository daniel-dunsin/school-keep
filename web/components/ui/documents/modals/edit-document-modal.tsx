'use client';
import Button from '@/components/common/button';
import FileUploader from '@/components/common/input/file-uploader';
import SelectField from '@/components/common/input/select-field';
import TextField from '@/components/common/input/text-field';
import Modal from '@/components/common/modal';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { UpdateDocumentDto } from '@/lib/schemas/interfaces';
import { Document } from '@/lib/schemas/types';
import documentService from '@/lib/services/documents.service';
import { useMutation } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

interface Props {
  document: Document;
}

const EditDocumentModal: FC<Props> = ({ document }) => {
  const { hideModal } = useModal();
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDocumentDto>({
    defaultValues: {
      documentName: document?.documentName,
    },
  });
  const file = watch('file');

  const { isPending: updatingDocument, mutateAsync: updateDocument } =
    useMutation({
      mutationKey: ['useUpdateDocument', document._id],
      mutationFn: (e: UpdateDocumentDto) =>
        documentService.updateDocument(document.reference, e),
      onSuccess() {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) =>
            queryKey.includes('useGetDocument') &&
            queryKey.includes(document._id),
        }),
          hideModal(),
          toast.success('Document updated successfully');
      },
    });

  const submit = async (e: UpdateDocumentDto) => {
    if (e.documentName === document?.documentName && !file) {
      return toast.error('No change made');
    }
    await updateDocument(e);
  };

  return (
    <Modal onClose={hideModal}>
      <section className="w-[95vw] max-w-[700px] bg-white p-6 space-y-4 max-h-[90vh] overflow-y-scroll">
        <div className="flex items-center justify-between">
          <h1 className="text-[1.1rem]">Edit Document</h1>
          <MdClose onClick={hideModal} size={25} cursor={'pointer'} />
        </div>

        <form onSubmit={handleSubmit(submit)} className="mt-5 space-y-5">
          <TextField
            label="Document Name"
            InputProps={{
              placeholder: 'enter document name',
              ...register('documentName', {
                required: {
                  value: true,
                  message: 'document name is required',
                },
              }),
            }}
            helperText={errors?.documentName?.message}
          />

          {file ? (
            <SelectField
              value={file.name}
              onClear={() => setValue('file', undefined)}
              className="w-full"
            />
          ) : (
            //@ts-ignore
            <FileUploader
              onUpload={(file) => setValue('file', file)}
              inputType="*"
            />
          )}

          <Button
            loading={updatingDocument}
            fullWidth
            variant="filled"
            size="medium"
          >
            Edit Document
          </Button>
        </form>
      </section>
    </Modal>
  );
};

export default EditDocumentModal;
