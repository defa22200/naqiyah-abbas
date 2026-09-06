import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reveal (PRD §9 Phase 2 Item 10)
 * MotionSites.ai signature blur-assemble & scrubbed reveal wrapper.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  yOffset = 24,
  scale = 0.98,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        scale: scale,
        filter: 'blur(4px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
