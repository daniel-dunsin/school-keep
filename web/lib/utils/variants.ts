import { Variant } from 'framer-motion';

export const dropdownVariant: Record<string, Variant> = {
  hidden: {
    opacity: 0,
    top: '100%',
  },
  visible: {
    opacity: 1,
    top: '120%',
    transition: {
      type: 'bounce',
    },
  },

  arrowClosed: {
    rotate: '0deg',
  },

  arrowOpen: {
    rotate: '-180deg',
    transition: {
      type: 'bounce',
    },
  },
};
