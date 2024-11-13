import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { arrowMotion, switchingIconsVariants } from '../variants';
import { BsArrowRight } from 'react-icons/bs';
import { RiLoader2Line } from 'react-icons/ri';

const Spinner = () => {
  return (
    <motion.span variants={arrowMotion} initial="hidden" animate="visible">
      <motion.span
        variants={switchingIconsVariants}
        initial="hidden"
        animate={'visible'}
        exit="hidden"
      >
        <RiLoader2Line size={65} strokeWidth={0.01} className="animate-spin" />
      </motion.span>
    </motion.span>
  );
};

export default Spinner;
