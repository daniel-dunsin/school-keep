import { sidebarLinks } from '@/lib/data/sidebar.data';
import { usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

interface DashboardContextType {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
}

interface Props {
  children: ReactNode;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: FC<Props> = ({ children }) => {
  const [page, setPage] = useState('Dashboard');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setPage(sidebarLinks.find((link) => link.route == pathname)?.routeName!);
  }, [router, pathname]);

  return (
    <DashboardContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext) as DashboardContextType;

  if (!ctx) {
    ('Auth context not found in component tree, Wrap app with DashboardProvider');
  }

  return ctx;
};
