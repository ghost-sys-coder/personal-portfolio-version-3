/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

type MotionWrapperProps = {
  children: ReactNode;
  variants?: Variants;
  initial?: string;
  whileInView?: string;
  viewport?: { once: boolean; amount?: number | 'some' | 'all' };
  transition?: any;
  className?: string;
} & HTMLMotionProps<'div'>;

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1], // nice smooth cubic-bezier
    },
  },
};

export default function MotionWrapper({
  children,
  variants = defaultVariants,
  initial = 'hidden',
  whileInView = 'visible',
  viewport = { once: true, amount: 0.25 },
  transition,
  className,
  ...props
}: MotionWrapperProps) {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      variants={variants}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Quick helpers for common patterns

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <MotionWrapper
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </MotionWrapper>
  );
}

export function SlideUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <MotionWrapper
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </MotionWrapper>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <MotionWrapper
      variants={{
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </MotionWrapper>
  );
}