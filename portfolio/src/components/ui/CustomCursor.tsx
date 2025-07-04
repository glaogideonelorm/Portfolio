"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      // Cancel any pending animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Use requestAnimationFrame for smoother updates
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add mouse move listener with passive flag for better performance
    window.addEventListener("mousemove", updateMousePosition, {
      passive: true,
    });

    // Add hover listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover], .cursor-hover"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      // Cancel any pending animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

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
        style={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
      />

      {/* Glossy outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] cursor-ring"
        animate={{
          x: mousePosition.x - (isHovering ? 32 : 20),
          y: mousePosition.y - (isHovering ? 32 : 20),
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
        }}
        transition={{
          x: { type: "tween", ease: "linear", duration: 0 },
          y: { type: "tween", ease: "linear", duration: 0 },
          width: { type: "spring", stiffness: 500, damping: 30, duration: 0.1 },
          height: {
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 0.1,
          },
        }}
      />

      {/* Inverted inner circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          backgroundColor: "white",
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 16 : 10),
          y: mousePosition.y - (isHovering ? 16 : 10),
          width: isHovering ? 32 : 20,
          height: isHovering ? 32 : 20,
        }}
        transition={{
          x: { type: "tween", ease: "linear", duration: 0 },
          y: { type: "tween", ease: "linear", duration: 0 },
          width: { type: "spring", stiffness: 500, damping: 30, duration: 0.1 },
          height: {
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 0.1,
          },
        }}
      />
    </>
  );
}
