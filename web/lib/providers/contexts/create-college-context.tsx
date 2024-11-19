import { createContext, FC, ReactNode, useContext } from 'react';

interface CreateCollegeContextType {}

interface Props {
  children: ReactNode;
}

const CreateCollegeContext = createContext<
  CreateCollegeContextType | undefined
>(undefined);

export const CreateCollegeProvider: FC<Props> = ({ children }) => {
  return (
    <CreateCollegeContext.Provider value={{}}>
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
