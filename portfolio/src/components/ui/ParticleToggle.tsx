"use client";

import { Sparkles, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ParticleToggle() {
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("particles-enabled");
    if (saved !== null) {
      setParticlesEnabled(JSON.parse(saved));
    }
  }, []);

  const toggleParticles = () => {
    const newState = !particlesEnabled;
    setParticlesEnabled(newState);
    localStorage.setItem("particles-enabled", JSON.stringify(newState));

    // Dispatch custom event to notify ParticleBackground
    window.dispatchEvent(
      new CustomEvent("particleToggle", {
        detail: { enabled: newState },
      })
    );
  };

  return (
    <button
      onClick={toggleParticles}
      className="p-2 rounded-full hover:bg-gray-800 transition-all duration-300 cursor-hover hover:scale-110 hover:rotate-12"
      aria-label={particlesEnabled ? "Disable particles" : "Enable particles"}
      title={
        particlesEnabled
          ? "Disable particle effects for better performance"
          : "Enable particle effects"
      }
    >
      {particlesEnabled ? (
        <Sparkles className="w-5 h-5 text-purple-400" />
      ) : (
        <SparklesIcon className="w-5 h-5 text-gray-500" />
      )}
    </button>
  );
}
