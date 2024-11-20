'use client';
import { CreateCollegesDto } from '@/lib/schemas/interfaces';
import schoolService from '@/lib/services/school.service';
import { convertImageToBase64 } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { toast } from 'sonner';

interface CreateCollegeContextType {
  college: CreateCollegesDto;
  colleges: CreateCollegesDto[];
  collegeIndex: number;
  changeCollege(index: number): void;
  removeCollege(index: number): void;
  updateCollege(key: keyof CreateCollegesDto, value: any): void;
  createCollege(): void;
  apiCreateColleges(): void;
  apiCreatingColleges: boolean;
}

interface Props {
  children: ReactNode;
}

const CreateCollegeContext = createContext<
  CreateCollegeContextType | undefined
>(undefined);

export const CreateCollegeProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [currentCollege, setCurrentCollege] = useState(0);
  const [colleges, setColleges] = useState<CreateCollegesDto[]>([
    {
      name: '',
      unionName: '',
    },
  ]);

  const college = colleges[currentCollege];

  const changeCollege = (index: number) => setCurrentCollege(index);

  const removeCollege = (index: number) => {
    if (index != 0) {
      setCurrentCollege(index - 1);
    }
    setColleges((prev) =>
      prev.filter((_, collegeIndex) => collegeIndex != index)
    );
  };

  const updateCollege = (key: keyof CreateCollegesDto, value: any) => {
    setColleges((prev) => {
      return prev.map((c, index) => {
        if (index == currentCollege) {
          c[key] = value;
        }
        return c;
      });
    });
  };

  const createCollege = () => {
    setColleges((prev) => {
      prev[currentCollege + 1] = { name: '', unionName: '' };
      return prev;
    });
    setCurrentCollege((prev) => prev + 1);
  };

  const { mutateAsync, isPending: apiCreatingColleges } = useMutation({
    mutationKey: ['useCreateColleges'],
    mutationFn: schoolService.createColleges,
    onSuccess() {
      toast.success('Colleges Created');
      router.push('/dashboard/faculties');
    },
  });

  const apiCreateColleges = async () => {
    const completedCollegesWithFile = [
      ...colleges?.map((c) => ({ ...c })),
    ].slice(0, -1);

    const completedColleges = [];

    for (const college of completedCollegesWithFile) {
      college.logo = await convertImageToBase64(college.logo as File);

      completedColleges.push(college);
    }

    await mutateAsync(completedColleges);
  };

  return (
    <CreateCollegeContext.Provider
      value={{
        college,
        colleges,
        removeCollege,
        changeCollege,
        updateCollege,
        createCollege,
        collegeIndex: currentCollege,
        apiCreateColleges,
        apiCreatingColleges,
      }}
    >
      {children}
    </CreateCollegeContext.Provider>
  );
};

export const useCreateCollegeContext = () => {
  const ctx = useContext(CreateCollegeContext);

  if (!ctx) {
    throw new Error(
      'Auth context not found in component tree, Wrap app with AuthProvider'
    );
  }

  return ctx;
};
