import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function SeamLine({ orientation = 'horizontal', className = '' }) {
  const [ref, visible] = useScrollReveal(0.3);

  if (orientation === 'vertical') {
    return (
      <motion.div
        ref={ref}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={visible ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className={`w-[1px] bg-olive/15 origin-top ${className}`}
      />
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={visible ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`h-[1px] bg-olive/15 origin-left ${className}`}
    />
  );
}