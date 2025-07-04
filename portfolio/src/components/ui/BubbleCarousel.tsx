import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BubbleItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface BubbleCarouselProps {
  items: BubbleItem[];
  autoRotateSpeed?: number; // in milliseconds
}

export default function BubbleCarousel({
  items,
  autoRotateSpeed = 3000,
}: BubbleCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoRotateSpeed);

    return () => clearInterval(interval);
  }, [items.length, autoRotateSpeed]);

  const calculatePosition = (index: number) => {
    const totalItems = items.length;
    const angleStep = (2 * Math.PI) / totalItems;
    const angle = index * angleStep;
    const radius = 150; // Adjust this value to change the circle size

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      scale: index === activeIndex ? 1.2 : 1,
      zIndex: index === activeIndex ? 10 : 1,
    };
  };

  return (
    <div className="relative w-[400px] h-[400px] mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        {items.map((item, index) => {
          const { x, y, scale, zIndex } = calculatePosition(
            (index - activeIndex + items.length) % items.length
          );

          return (
            <motion.div
              key={item.id}
              className="absolute cursor-pointer"
              animate={{
                x,
                y,
                scale,
                zIndex,
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div
                className={`
                  w-24 h-24 rounded-full flex flex-col items-center justify-center
                  bg-gradient-to-br from-purple-500 to-pink-500
                  text-white font-medium text-sm text-center p-2
                  transform transition-all duration-300 cursor-hover
                  hover:shadow-lg hover:scale-110 hover:rotate-6
                  ${index === activeIndex ? "shadow-xl scale-110" : ""}
                `}
              >
                {item.icon}
                <span className="mt-2">{item.title}</span>
              </div>

              <AnimatePresence>
                {index === activeIndex && item.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4
                             bg-white/10 dark:bg-white/10 light:bg-black/10 backdrop-blur-md rounded-lg p-3 text-sm
                             text-white dark:text-white light:text-gray-800 max-w-[200px] text-center"
                  >
                    {item.description}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
