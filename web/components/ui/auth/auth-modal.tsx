import React, { FC, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { arrowMotion, authModalVariant } from '../home/variants';
import Login from './login';
import { MdClose } from 'react-icons/md';
import { cn } from '@/lib/utils';
import ForgotPassword from './forgot-password';
import ConfirmPasswordResetOtp from './confirm-password-otp';
import ResetPassword from './reset-password';
import { AuthPages } from '@/lib/schemas/types';

interface Props {
  onClose(): void;
}

const AuthModal: FC<Props> = ({ onClose }) => {
  const [page, setPage] = useState<AuthPages>('login');
  const [pageParams, setPageParams] = useState<string>('');

  const getCurrentPage = useCallback(() => {
    switch (page) {
      case 'login':
        return <Login setPage={setPage} />;
      case 'forgot-password':
        return (
          <ForgotPassword setPage={setPage} setPageParams={setPageParams} />
        );
      case 'confirm-password-otp':
        return (
          <ConfirmPasswordResetOtp
            email={pageParams}
            setPage={setPage}
            setPageParams={setPageParams}
          />
        );
      case 'reset-password':
        return (
          <ResetPassword
            tempToken={pageParams}
            setPage={setPage}
            setPageParams={setPageParams}
          />
        );
    }
  }, [pageParams, page]);

  return (
    <motion.div
      variants={authModalVariant}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={cn('bg-white px-4 pt-4 pb-8 w-[500px]')}
      inherit={false}
    >
      <div className="flex justify-end">
        <MdClose size={25} onClick={onClose} />
      </div>
      {getCurrentPage()}
    </motion.div>
  );
};

export default AuthModal;
