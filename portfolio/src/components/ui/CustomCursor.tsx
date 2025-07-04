"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add mouse move listener
    window.addEventListener("mousemove", updateMousePosition);

    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover], .cursor-hover"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white dark:bg-white light:bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0,
        }}
      />

      {/* Glossy outer ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9997] transition-all duration-200 cursor-ring ${
          isHovering ? "w-16 h-16" : "w-10 h-10"
        }`}
        animate={{
          x: mousePosition.x - (isHovering ? 32 : 20),
          y: mousePosition.y - (isHovering ? 32 : 20),
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0,
        }}
      />

      {/* Inverted inner circle */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference transition-all duration-200 ${
          isHovering ? "w-8 h-8" : "w-5 h-5"
        }`}
        style={{
          backgroundColor: "white",
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 16 : 10),
          y: mousePosition.y - (isHovering ? 16 : 10),
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0,
        }}
      />
    </>
  );
}
