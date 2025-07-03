"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/3d/ParticleBackground";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen bg-gray-900 text-white">
      <ParticleBackground />
      {/* Overlay to enhance text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/20 backdrop-blur-sm" />
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-8 text-white drop-shadow-2xl"
        >
          ---IS THIS THE CORRECT PROJECT?---
        </motion.h1>
        <TypeAnimation
          sequence={[
            "A Passionate Software Developer",
            2000,
            "I build things for the web.",
            2000,
            "Specializing in React & Next.js.",
            2000,
            "Specializing in Spring Boot & React.",
            2000,
          ]}
          wrapper="h2"
          speed={50}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white drop-shadow"
          repeat={Infinity}
        />
      </div>
    </section>
  );
};

export default Hero;
