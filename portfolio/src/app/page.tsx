"use client";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Assistant from "@/components/sections/Assistant";
import Contact from "@/components/sections/Contact";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

export default function Home() {
  return (
    <main>
      <Hero />
      <RevealOnScroll>
        <About />
      </RevealOnScroll>
      <RevealOnScroll>
        <Projects />
      </RevealOnScroll>
      <RevealOnScroll>
        <Assistant />
      </RevealOnScroll>
      <RevealOnScroll>
        <Contact />
      </RevealOnScroll>
    </main>
  );
}
