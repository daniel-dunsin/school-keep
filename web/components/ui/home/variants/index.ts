import { Variant } from 'framer-motion';

type VariantsType = Record<string, Variant>;

export const arrowMotion: VariantsType = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      delay: 0,
    },
  },
};

export const authModalVariant: VariantsType = {
  hidden: {
    opacity: 0,
    y: '100vh',
    x: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      duration: 100,
    },
  },
};

export const arrowContainerMotion: VariantsType = {
  0: {
    opacity: 1,
  },
  1: {
    opacity: [0.7, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'circInOut',
    },
  },
  2: {
    opacity: 1,
  },
};

export const lottieArrowMotion: VariantsType = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'intertia',
      delay: 0,
    },
  },
};

export const ctaVariants: VariantsType = {
  0: {
    x: 0,
    y: 0,
  },
  1: {
    x: -100,
    y: -100,
    transition: {
      type: 'spring',
      stiffness: 200,
    },
  },
  2: {
    x: 0,
    y: 0,
  },
};

export const switchingIconsVariants: VariantsType = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'none',
    },
  },
};
