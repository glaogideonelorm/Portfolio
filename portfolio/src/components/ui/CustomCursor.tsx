"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Use requestAnimationFrame for smoother updates
      animationFrameRef.current = requestAnimationFrame(() => {
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
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
      {/* Main cursor dot - simplified */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0,
        }}
      />

      {/* Simplified outer ring - removed expensive effects */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9997] border border-white/20"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
        }}
        transition={{
          x: { type: "tween", ease: "linear", duration: 0 },
          y: { type: "tween", ease: "linear", duration: 0 },
          width: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.15,
          },
          height: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.15,
          },
        }}
        style={{
          background: isHovering
            ? "radial-gradient(circle, transparent 60%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0.2) 80%, transparent 80%)"
            : "radial-gradient(circle, transparent 70%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0.15) 90%, transparent 90%)",
        }}
      />
    </>
  );
}
