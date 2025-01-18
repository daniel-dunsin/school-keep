import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { DocType } from '../schemas/enums';
import {
  FileImageIcon,
  FileJsonIcon,
  FileVideoIcon,
  PresentationIcon,
} from 'lucide-react';
import { FaRegFilePdf } from 'react-icons/fa';
import { BsFiletypeDocx, BsFiletypeXlsx, BsFileWord } from 'react-icons/bs';
import { PiFileCsv } from 'react-icons/pi';
import { BiLogoPlayStore } from 'react-icons/bi';
import { RiFileUnknowLine } from 'react-icons/ri';
import { Document } from '../schemas/types';
import Image from 'next/image';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function errorHandler(error: any) {
  let errorMessage = 'Oops! an error occured';
  if (typeof error == 'string') {
    errorMessage = error;
  }

  if (error instanceof AxiosError) {
    errorMessage = String(error?.response?.data?.error ?? errorMessage);
  }

  toast.error(errorMessage);
  throw error;
}

export function convertImageToBase64(image: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(image);
  });
}

export function getApiQueryString<T extends Object = {}>(
  apiUrl: string,
  query?: T
) {
  let url = `${apiUrl}?`;

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (key && value) {
        url += `${key}=${value}&`;
      }
    });
  }

  return url;
}

export const formatDate = (date: Date) => {
  return format(date, 'do LLL, yyyy');
};

export const getDocTypeFromMimeType = (mimeType: string) => {
  switch (mimeType) {
    // Image MIME types
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
    case 'image/bmp':
    case 'image/webp':
      return DocType.image;

    // Video MIME types
    case 'video/mp4':
    case 'video/avi':
    case 'video/mpeg':
    case 'video/webm':
    case 'video/quicktime':
      return DocType.video;

    // PDF MIME type
    case 'application/pdf':
      return DocType.pdf;

    // Excel MIME types
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.ms-excel':
      return DocType.xlsx;

    // PowerPoint MIME types
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    case 'application/vnd.ms-powerpoint':
      return DocType.pptx;

    case 'application/msword': // .doc
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': // .docx
      return DocType.doc;

    case 'text/plain':
      return DocType.txt;

    // CSV MIME type
    case 'text/csv':
      return DocType.csv;

    // APK MIME type
    case 'application/vnd.android.package-archive':
      return DocType.apk;

    // JSON MIME type
    case 'application/json':
    case 'text/json':
      return DocType.json;

    // Unknown or unsupported types
    default:
      return DocType.unknown;
  }
};

export const getDocTypeIcon = (mimeType: string, color?: string, size = 25) => {
  const docType = getDocTypeFromMimeType(mimeType);

  switch (docType) {
    case DocType.image:
      return <FileImageIcon color={color ?? 'black'} size={size} />;
    case DocType.video:
      return <FileVideoIcon color={color ?? 'black'} size={size} />;
    case DocType.pdf:
      return (
        <FaRegFilePdf className="text-red-500" size={size} style={{ color }} />
      );
    case DocType.xlsx:
      return (
        <BsFiletypeXlsx
          className="text-green-500"
          size={size}
          style={{ color }}
        />
      );
    case DocType.pptx:
      return (
        <PresentationIcon
          className="text-red-500"
          size={size}
          style={{ color }}
        />
      );
    case DocType.csv:
      return (
        <PiFileCsv className="text-blue-500" size={size} style={{ color }} />
      );
    case DocType.apk:
      return (
        <BiLogoPlayStore
          className="text-green-500"
          size={size}
          style={{ color }}
        />
      );
    case DocType.json:
      return (
        <FileJsonIcon
          className="text-green-500"
          size={size}
          style={{ color }}
        />
      );
    case DocType.doc:
      return (
        <BsFiletypeDocx
          className="text-blue-500"
          size={size}
          style={{ color }}
        />
      );
    case DocType.txt:
      return (
        <BsFileWord className="text-blue-500" size={size} style={{ color }} />
      );
    case DocType.unknown:
      return <RiFileUnknowLine color={color ?? 'black'} size={size} />;
  }
};

export const getDocPreview = (document: Document, color?: string) => {
  const docIcon = getDocTypeIcon(document.mediaType!, color);
  const docType = getDocTypeFromMimeType(document.mediaType!);

  switch (docType) {
    case DocType.image:
      return document.url ? (
        <Image
          src={document.url!}
          alt={document.documentName!}
          width={200}
          height={200}
          className="w-full h-full object-cover object-center"
        />
      ) : (
        docIcon
      );
    case DocType.video:
      return document.url ? (
        <video
          muted
          controls={false}
          autoPlay
          src={document.url!}
          aria-label={document.documentName!}
          className="w-full h-full object-cover object-center"
        />
      ) : (
        docIcon
      );
    default:
      return docIcon;
  }
};
