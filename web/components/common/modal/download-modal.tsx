'use client';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import Modal from '.';
import { useModal } from '@/lib/providers/contexts/modal-context';
import Spinner from '@/components/ui/home/banner/spinner';
import { BsDownload } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'sonner';
import { https } from '@/lib/configs/http.config';

interface Props {
  url: string;
  fileName: string;
  studentName: string;
}

const DownloadModal: FC<Props> = ({ url, fileName, studentName }) => {
  const name = `${studentName}_${fileName}`;
  const [totalBytes, setTotalBytes] = useState(0);
  const [downloadedBytes, setDownloadedBytes] = useState(0);
  const { hideModal } = useModal();
  const abortController = useRef<AbortController>();

  const percentageDownloaded = useMemo(
    () => (downloadedBytes / (totalBytes || 1)) * 100,
    [downloadedBytes, totalBytes]
  );

  const convertBytes = (bytes: number, showSuffix = true) => {
    if (bytes < 1024) {
      return `${bytes} ${showSuffix ? 'B' : ''}`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} ${showSuffix ? 'KB' : ''}`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / 1024 / 1024).toFixed(2)} ${showSuffix ? 'MB' : ''}`;
    } else {
      return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} ${
        showSuffix ? 'GB' : ''
      }`;
    }
  };

  useEffect(() => {
    const handleDownload = async () => {
      setTotalBytes(0);
      setDownloadedBytes(0);

      abortController.current = new AbortController();

      const apiUrl = `/document/download?url=${encodeURIComponent(
        url
      )}&fileName=${encodeURIComponent(name)}`;

      const response = await https.get(apiUrl, {
        responseType: 'blob',
        signal: abortController.current?.signal,
        onDownloadProgress: (progress) => {
          if (progress) {
            setTotalBytes(progress.total || progress.bytes);
            if (progress.loaded > downloadedBytes) {
              setDownloadedBytes(progress.loaded);
            }
          }
        },
      });

      const blob = new Blob([response.data], { type: response?.data?.type });

      const downloadUrl = window.URL.createObjectURL(blob);
      const linkTag = document.createElement('a');
      linkTag.href = url;
      linkTag.download = name;
      linkTag.target = '_blank';
      linkTag.setAttribute('download', name);
      document.body.appendChild(linkTag);

      linkTag.click();

      document.body.removeChild(linkTag);
      window.URL.revokeObjectURL(downloadUrl);

      toast.success('File downloaded successfully ✅');
      hideModal();
    };

    handleDownload();
  }, [url]);

  const onCancel = () => {
    if (abortController.current) {
      toast.promise(
        async () => {
          abortController.current?.abort();
          hideModal();
        },
        {
          loading: 'Aborting download',
          success: 'Download cancelled successfully',
          error: 'Unable to cancel download',
        }
      );
    }
  };

  return (
    <Modal
      onClose={hideModal}
      isAutomatic={false}
      className="rounded-md bg-white p-6 max-w-[250px] mx-auto text-center flex flex-col items-center gap-4 cursor-pointer"
    >
      <span className="self-end">
        <MdClose size={20} onClick={onCancel} />
      </span>
      <BsDownload size={60} className="animate-bounce" />
      <div className="w-full rounded-full p-1 bg-gray-200 h-[8px] relative overflow-x-hidden">
        <div
          className="rounded-full h-full bg-mainLight absolute left-0 top-0"
          style={{ width: `${percentageDownloaded}%` }}
        ></div>
      </div>
      <p className="font-bold text-mainLight">
        {convertBytes(downloadedBytes, false)}/{convertBytes(totalBytes)}
      </p>
    </Modal>
  );
};

export default DownloadModal;
