'use client';
import React, { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { arrowMotion, switchingIconsVariants } from '../variants';
import { BsArrowRight } from 'react-icons/bs';
import { RiLoader2Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { AuthSession } from '@/lib/schemas/types';
import { useAuthContext } from '@/lib/providers/contexts/auth-context';

interface Props {
  nextStep(): void;
}

const Spinner: FC<Props> = ({ nextStep }) => {
  const [session, setSession] = useState<AuthSession>('loading');
  const router = useRouter();

  const { getLoggedInUser } = useAuthContext();

  useEffect(() => {
    if (session == 'authenticated') {
      router.push('/dashboard');
    } else if (session == 'unauthenticated') {
      setTimeout(nextStep, 1000);
    }
  }, [session, nextStep, router]);

  useEffect(() => {
    getLoggedInUser()
      .then((data) => {
        if (data) {
          setSession('authenticated');
          router.push('/dashboard');
        } else {
          setTimeout(nextStep, 1000);
        }
      })
      .catch((e) => {
        setSession('unauthenticated');
        setTimeout(nextStep, 1000);
      });
  }, []);

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
