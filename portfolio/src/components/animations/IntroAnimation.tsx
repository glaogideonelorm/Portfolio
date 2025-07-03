"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

type IntroAnimationProps = {
  onAnimationComplete: () => void;
};

export default function IntroAnimation({
  onAnimationComplete,
}: IntroAnimationProps) {
  const [shouldExit, setShouldExit] = useState(false);

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Disable auto-fade while testing to keep the intro visible.
  useEffect(() => {
    // no-op
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-gray-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold flex flex-col items-center justify-center text-center space-y-4"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.6 }}
      >
        <motion.span variants={textVariants} className="text-white">
          Hey, I&apos;m <span className="text-blue-500">Gideon</span>
        </motion.span>
        <motion.span
          variants={textVariants}
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Software Developer
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
