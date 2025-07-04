import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ROTATING_PHRASES = [
  "Full-stack developer specializing in building exceptional digital experiences",
  "Crafting innovative solutions with modern technologies",
  "Turning complex problems into elegant, user-friendly applications",
  "Building scalable systems that make a difference",
  "Creating seamless experiences across the digital landscape",
];

export default function RotatingText() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 4000); // Increased from 3000ms to 4000ms for smoother experience

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentPhraseIndex}
          className="text-xl md:text-2xl text-gradient-alt text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{
            duration: 0.3, // Reduced from 0.5s for snappier transitions
            ease: "easeOut",
          }}
        >
          {ROTATING_PHRASES[currentPhraseIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
