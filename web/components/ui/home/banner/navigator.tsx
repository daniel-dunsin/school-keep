'use client';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { LottieOptions, useLottie } from 'lottie-react';
import { AnimatePresence, motion, useCycle, Variant } from 'framer-motion';

import directionArrowAnimation from '../../../../public/lotties/arrow-lottie.json';
import { BiLoaderAlt } from 'react-icons/bi';
import { RiLoader2Line } from 'react-icons/ri';
import {
  arrowContainerMotion,
  arrowMotion,
  ctaVariants,
  lottieArrowMotion,
  switchingIconsVariants,
} from '../variants';
import BannerOverlay from './banner-overlay';
import { cn } from '@/lib/utils';
import NavArrow from './arrow';
import Spinner from './spinner';
import AuthModal from '../../auth/auth-modal';

const HomeNavigator = () => {
  const [cta, cycleCta] = useCycle('0', '1', '2');

  const options: LottieOptions = useMemo(
    () => ({
      animationData: directionArrowAnimation,
      loop: true,
    }),
    []
  );

  const { View: Arrow } = useLottie(options);

  useEffect(() => {
    //time to check auth state
    if (cta == '1') {
      setTimeout(cycleCta, 2000);
    }
  }, [cta]);

  return (
    <BannerOverlay showOverlay={cta != '0'}>
      <motion.div
        variants={ctaVariants}
        initial={'0'}
        animate={cta}
        className={cn(
          'absolute bottom-[100px] right-[30px] flex-col flex items-center min-w-[200px]',
          cta == '2' && 'w-[100vw] h-[100vh] flex items-center justify-center',
          cta == 'bottom-0 left-0'
        )}
      >
        <AnimatePresence>
          <motion.div
            variants={lottieArrowMotion}
            initial="hidden"
            animate={cta == '0' ? 'visible' : 'hidden'}
            exit="hidden"
          >
            {Arrow}
          </motion.div>
        </AnimatePresence>

        <motion.div
          variants={arrowContainerMotion}
          initial="0"
          animate={cta}
          onClick={() => {
            if (cta == '0') {
              cycleCta();
            }
          }}
          className={cn(
            'cursor-pointer flex items-center justify-center text-[2.5rem]',
            cta != '2' &&
              'rounded-full w-[80px] h-[80px] bg-mainLight text-white',
            cta == '2' && 'text-black max-w-[90vw]'
          )}
        >
          <AnimatePresence>
            {cta == '0' ? (
              <NavArrow />
            ) : cta == '1' ? (
              <Spinner />
            ) : (
              <AuthModal onClose={() => cycleCta(0)} />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </BannerOverlay>
  );
};

export default HomeNavigator;
