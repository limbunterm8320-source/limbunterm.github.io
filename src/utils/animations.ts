import { Variants } from 'motion/react';

// Container variant that coordinates staggered entry of children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

// Slightly slower stagger for dense grids (e.g. projects, brands)
export const staggerGridContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12
    }
  }
};

// Standard upward fade for headers, badges, paragraphs
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 28 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.65, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

// Subtle scale & lift for cards, banners, and modals
export const fadeInScale: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.94, 
    y: 22 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -36 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 36 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};
