import { User } from '@/lib/schemas/types';
import userService from '@/lib/services/user.service';
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
      mutationFn: userService.getUser,
      onSuccess(data) {
        if (data) {
          setUser(data);
        }
      },
    });

  useEffect(() => {
    if (!user && pathname != '/') {
      getLoggedInUser();
    }
  }, [user, getLoggedInUser, pathname]);

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
