import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
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
