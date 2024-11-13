import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { arrowMotion, switchingIconsVariants } from '../variants';
import { BsArrowRight } from 'react-icons/bs';

const NavArrow = () => {
  return (
    <motion.span variants={arrowMotion} initial="hidden" animate="visible">
      <motion.span
        variants={switchingIconsVariants}
        initial="hidden"
        animate={'visible'}
        exit="hidden"
      >
        <BsArrowRight size={50} />
      </motion.span>
    </motion.span>
  );
};

export default NavArrow;
