import { User } from '@/lib/schemas/types';
import userService from '@/lib/services/user.service';
import { errorHandler } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
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
import { queryClient } from '..';

interface AuthContextType {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  getLoggedInUser(): Promise<User | false>;
  gettingLoggedInUser: boolean;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const pathname = usePathname();

  const { mutateAsync: getLoggedInUser, isPending: gettingLoggedInUser } =
    useMutation({
      mutationKey: ['useGetLoggedInUser'],
      mutationFn: async () => {
        const query = queryClient.getQueryState(['useGetLoggedInUser']);

        if ((query?.status && query?.status != 'pending') || !query?.status) {
          return userService.getUser();
        }
        return false;
      },
      onSuccess(data) {
        if (data) {
          setUser(data);
        }
      },
    });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        getLoggedInUser,
        gettingLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'Auth context not found in component tree, Wrap app with AuthProvider'
    );
  }

  return context;
};
