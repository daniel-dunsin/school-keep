import React, { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { arrowMotion, authModalVariant } from '../home/variants';
import Login from './login';
import { MdClose } from 'react-icons/md';
import { cn } from '@/lib/utils';

interface Props {
  onClose(): void;
}

const AuthModal: FC<Props> = ({ onClose }) => {
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
      <Login />
    </motion.div>
  );
};

export default AuthModal;
