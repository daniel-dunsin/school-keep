'use client';
import React, { FC, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { arrowMotion, switchingIconsVariants } from '../variants';
import { BsArrowRight } from 'react-icons/bs';
import { RiLoader2Line } from 'react-icons/ri';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  nextStep(): void;
}

const Spinner: FC<Props> = ({ nextStep }) => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == 'authenticated') {
      router.push('/dashboard');
    } else if (status == 'unauthenticated') {
      setTimeout(nextStep, 1000);
    }
  }, [status, nextStep, router]);

  return (
    <motion.span
      variants={arrowMotion}
      initial="hidden"
      animate="visible"
      inherit={false}
    >
      <motion.span
        variants={switchingIconsVariants}
        initial="hidden"
        animate={'visible'}
        exit="hidden"
        inherit={false}
      >
        <RiLoader2Line size={65} strokeWidth={0.01} className="animate-spin" />
      </motion.span>
    </motion.span>
  );
};

export default Spinner;
