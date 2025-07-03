"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
}

const RevealOnScroll = ({ children, delay = 0.25, y = 75 }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealOnScroll;
