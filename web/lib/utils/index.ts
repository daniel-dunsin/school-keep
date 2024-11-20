import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

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
