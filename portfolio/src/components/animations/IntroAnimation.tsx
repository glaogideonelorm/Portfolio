import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showSecondText, setShowSecondText] = useState(false);
  const [complete, setComplete] = useState(false);
  const [slideFirst, setSlideFirst] = useState(false);

  useEffect(() => {
    // First text slides in
    const timer1 = setTimeout(() => setSlideFirst(true), 300);
    // First text moves to the side and second text appears
    const timer2 = setTimeout(() => setShowSecondText(true), 1200);
    // Animation completes
    const timer3 = setTimeout(() => {
      setComplete(true);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 text-4xl md:text-6xl font-bold overflow-hidden">
            <motion.span
              className="text-gradient inline-block"
              initial={{ opacity: 0, x: -100 }}
              animate={{
                opacity: 1,
                x: slideFirst ? (showSecondText ? -20 : 0) : -100,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                x: { duration: showSecondText ? 0.5 : 0.5 },
              }}
            >
              Hello, I&apos;m Gideon Glago
            </motion.span>

            <AnimatePresence>
              {showSecondText && (
                <motion.span
                  className="text-gradient-alt inline-block"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  | Software Developer
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
