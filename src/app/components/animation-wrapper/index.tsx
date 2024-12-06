'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function AnimationWrapper({ children }: { children: ReactNode }) {
  return <AnimatePresence mode="wait" initial={false}>{children}</AnimatePresence>;
}
