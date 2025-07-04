"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

  // Define hobby route mapping
  const getHobbyRoute = (id: string) => {
    const routes: { [key: string]: string } = {
      gaming: "/hobbies/gaming",
      reading: "/hobbies/reading",
      music: "/hobbies/music",
      photography: "/hobbies/photography",
      cooking: "/hobbies/cooking",
    };
    return routes[id] || "#";
  };

  const isHobby = (id: string) => {
    return ["gaming", "reading", "music", "photography", "cooking"].includes(
      id
    );
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
                             bg-white/10 dark:bg-white/10 light:bg-black/10 backdrop-blur-md rounded-lg p-4 text-sm
                             text-white dark:text-white light:text-gray-800 max-w-[220px] text-center"
                  >
                    <p className="mb-3">{item.description}</p>

                    {/* Show "Explore More" button only for hobby items */}
                    {isHobby(item.id) && (
                      <Link href={getHobbyRoute(item.id)}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center px-3 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold text-xs hover:shadow-lg transition-all"
                        >
                          Explore More
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </motion.button>
                      </Link>
                    )}
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
