import Button from '@/components/common/button';
import FileUploader from '@/components/common/input/file-uploader';
import SelectField from '@/components/common/input/select-field';
import TextField from '@/components/common/input/text-field';
import Modal from '@/components/common/modal';
import { queryClient } from '@/lib/providers';
import { useModal } from '@/lib/providers/contexts/modal-context';
import { CreateDocumentDto } from '@/lib/schemas/interfaces';
import documentService from '@/lib/services/documents.service';
import { useMutation } from '@tanstack/react-query';
import React, { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

interface Props {
  folder: string;
  studentId: string;
}

const CreateDocumentModal: FC<Props> = ({ folder, studentId }) => {
  const [progress, setProgress] = useState(0);
  const { hideModal } = useModal();
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDocumentDto>({
    defaultValues: {
      folder,
      studentId,
    },
  });
  const file = watch('file');
  const abortController = useMemo(() => new AbortController(), []);

  const { isPending: creatingDocument, mutateAsync: createDocument } =
    useMutation({
      mutationKey: ['useCreateDocument', folder, studentId],
      mutationFn: (e: CreateDocumentDto) => documentService.createDocument(e),
      onSuccess() {
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) =>
            queryKey.includes('useGetAllDocuments') &&
            queryKey.includes(folder),
        });
        hideModal();
        toast.success('Document uploaded successfully');
      },
      onError() {
        setProgress(0);
      },
    });

  const submit = async (e: CreateDocumentDto) => {
    if (!e.file) {
      return toast.error('Upload file');
    }

    e.onUploadProgress = (uploadPercentage: number) =>
      setProgress(uploadPercentage);
    e.abortController = abortController;
    await createDocument(e);
  };

  const onClose = () => {
    if (creatingDocument) {
      toast.promise(async () => (abortController?.abort(), hideModal()), {
        loading: 'Cancelling upload',
        success: 'Document upload cancelled',
        error: 'Failed to cancel upload',
      });
    } else {
      hideModal();
    }
  };

  return (
    <Modal onClose={onClose} isAutomatic={false}>
      <section className="w-[95vw] max-w-[700px] bg-white p-6 space-y-4 max-h-[90vh] overflow-y-scroll">
        <div className="flex items-center justify-between">
          <h1 className="text-[1.1rem]">Add Document</h1>
          <MdClose onClick={onClose} size={25} cursor={'pointer'} />
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
            <FileUploader
              onUpload={(file: File) => setValue('file', file)}
              inputType="*"
            />
          )}

          <Button
            loading={creatingDocument}
            fullWidth
            variant="filled"
            size="medium"
            loadingWithDefaultChildren={true}
          >
            {creatingDocument ? `${progress}% uploaded` : 'Create Document'}
          </Button>
        </form>
      </section>
    </Modal>
  );
};

export default CreateDocumentModal;
