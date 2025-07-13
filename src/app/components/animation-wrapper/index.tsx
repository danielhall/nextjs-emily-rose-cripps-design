'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';

export default function AnimationWrapper({ children }: { children: ReactNode }) {
  return <AnimatePresence mode="wait" initial={false}>{children}</AnimatePresence>;
}
