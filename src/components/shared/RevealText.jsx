import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';

export default function RevealText({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  threshold = 0.15,
}) {
  const [ref, visible] = useScrollReveal(threshold);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </div>
  );
}