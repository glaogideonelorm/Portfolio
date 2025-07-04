"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";

interface ParticleBackgroundProps {
  particleCount?: number;
  particleColor?: string;
  connectionColor?: string;
  maxConnectionDistance?: number;
}

export default function ParticleBackground({
  particleCount = 80,
  particleColor,
  connectionColor,
  maxConnectionDistance = 120,
}: ParticleBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const particlesRef = useRef<THREE.Points>();
  const linesRef = useRef<THREE.LineSegments>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();
  const connectionUpdateCounterRef = useRef(0);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
  const [isEnabled, setIsEnabled] = useState(true);

  // Theme detection
  useEffect(() => {
    const detectTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      setCurrentTheme(isLight ? "light" : "dark");
    };

    // Initial detection
    detectTheme();

    // Watch for theme changes
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Particle toggle listener
  useEffect(() => {
    const savedEnabled = localStorage.getItem("particles-enabled");
    if (savedEnabled !== null) {
      setIsEnabled(JSON.parse(savedEnabled));
    }

    const handleParticleToggle = (event: CustomEvent) => {
      setIsEnabled(event.detail.enabled);
    };

    window.addEventListener(
      "particleToggle",
      handleParticleToggle as EventListener
    );

    return () => {
      window.removeEventListener(
        "particleToggle",
        handleParticleToggle as EventListener
      );
    };
  }, []);

  // Dynamic colors based on theme
  const themeColors = {
    light: {
      particle: "#374151", // Dark gray for light theme
      connection: "#3b82f6", // Blue
    },
    dark: {
      particle: "#ffffff", // White for dark theme
      connection: "#4f46e5", // Indigo
    },
  };

  const actualParticleColor =
    particleColor || themeColors[currentTheme].particle;
  const actualConnectionColor =
    connectionColor || themeColors[currentTheme].connection;

  const initScene = useCallback(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 500;
    cameraRef.current = camera;

    // Renderer setup - optimized for performance
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Disabled for performance
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Capped for performance
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create particles
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random positions
      particlePositions[i] = (Math.random() - 0.5) * 1000;
      particlePositions[i + 1] = (Math.random() - 0.5) * 1000;
      particlePositions[i + 2] = (Math.random() - 0.5) * 500;

      // Random velocities
      particleVelocities[i] = (Math.random() - 0.5) * 0.8; // Reduced velocity
      particleVelocities[i + 1] = (Math.random() - 0.5) * 0.8;
      particleVelocities[i + 2] = (Math.random() - 0.5) * 0.5;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      "velocity",
      new THREE.BufferAttribute(particleVelocities, 3)
    );

    // Simplified particle material
    const particleMaterial = new THREE.PointsMaterial({
      color: actualParticleColor,
      size: 3, // Reduced size
      transparent: true,
      opacity: currentTheme === "light" ? 0.6 : 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Connection lines setup
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: actualConnectionColor,
      transparent: true,
      opacity: currentTheme === "light" ? 0.15 : 0.25,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);
    linesRef.current = lines;
  }, [particleCount, actualParticleColor, actualConnectionColor, currentTheme]);

  // Update materials when theme changes
  useEffect(() => {
    if (particlesRef.current && linesRef.current) {
      const particleMaterial = particlesRef.current
        .material as THREE.PointsMaterial;
      const lineMaterial = linesRef.current.material as THREE.LineBasicMaterial;

      particleMaterial.color.setHex(
        parseInt(actualParticleColor.replace("#", "0x"))
      );
      particleMaterial.opacity = currentTheme === "light" ? 0.6 : 0.8;

      lineMaterial.color.setHex(
        parseInt(actualConnectionColor.replace("#", "0x"))
      );
      lineMaterial.opacity = currentTheme === "light" ? 0.15 : 0.25;
    }
  }, [currentTheme, actualParticleColor, actualConnectionColor]);

  const updateConnections = useCallback(() => {
    if (!particlesRef.current || !linesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    const linePositions: number[] = [];

    // Optimized connection calculation - skip some particles for performance
    const step = Math.max(1, Math.floor(particleCount / 50)); // Limit connections
    for (let i = 0; i < particleCount; i += step) {
      for (let j = i + step; j < particleCount; j += step) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];

        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];

        const distanceSquared =
          (x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2;

        if (distanceSquared < maxConnectionDistance ** 2) {
          linePositions.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }

    linesRef.current.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePositions), 3)
    );
  }, [particleCount, maxConnectionDistance]);

  const animate = useCallback(() => {
    if (
      !isEnabled ||
      !sceneRef.current ||
      !rendererRef.current ||
      !cameraRef.current ||
      !particlesRef.current
    )
      return;

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    const velocities = particlesRef.current.geometry.attributes.velocity
      .array as Float32Array;

    // Update particle positions with reduced calculations
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];

      // Simplified mouse interaction - only for nearby particles
      const particleX = positions[i];
      const particleY = positions[i + 1];
      const mouseWorldX = (mouseRef.current.x / window.innerWidth) * 1000 - 500;
      const mouseWorldY =
        -(mouseRef.current.y / window.innerHeight) * 1000 + 500;

      const distanceSquared =
        (particleX - mouseWorldX) ** 2 + (particleY - mouseWorldY) ** 2;

      if (distanceSquared < 6400) {
        // 80px influence radius squared
        const distance = Math.sqrt(distanceSquared);
        const force = (80 - distance) / 80;
        const dx = (particleX - mouseWorldX) / distance;
        const dy = (particleY - mouseWorldY) / distance;

        velocities[i] += dx * force * 0.02;
        velocities[i + 1] += dy * force * 0.02;
      }

      // Boundary wrapping
      if (positions[i] > 500) positions[i] = -500;
      if (positions[i] < -500) positions[i] = 500;
      if (positions[i + 1] > 500) positions[i + 1] = -500;
      if (positions[i + 1] < -500) positions[i + 1] = 500;
      if (positions[i + 2] > 250) positions[i + 2] = -250;
      if (positions[i + 2] < -250) positions[i + 2] = 250;

      // Damping
      velocities[i] *= 0.998;
      velocities[i + 1] *= 0.998;
      velocities[i + 2] *= 0.998;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Update connections less frequently
    connectionUpdateCounterRef.current++;
    if (connectionUpdateCounterRef.current % 20 === 0) {
      // Every 20 frames instead of random
      updateConnections();
    }

    // Reduced camera animation
    const time = Date.now() * 0.0001;
    cameraRef.current.position.x = Math.sin(time) * 15;
    cameraRef.current.position.y = Math.cos(time) * 10;
    cameraRef.current.lookAt(0, 0, 0);

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    if (isEnabled) {
      frameRef.current = requestAnimationFrame(animate);
    }
  }, [particleCount, updateConnections, isEnabled]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  }, []);

  useEffect(() => {
    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      // Remove event listeners
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleMouseMove, handleResize]);

  // Component unmount cleanup
  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (rendererRef.current) {
        if (
          mountRef.current &&
          mountRef.current.contains(rendererRef.current.domElement)
        ) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  // Initialize particles on first load if enabled
  useEffect(() => {
    if (isEnabled && !sceneRef.current) {
      initScene();
      animate();
    }
  }, [isEnabled, initScene, animate]);

  // Restart animation when particles are re-enabled
  useEffect(() => {
    if (isEnabled && !sceneRef.current) {
      // Re-initialize scene when particles are enabled
      initScene();
      animate();
    } else if (isEnabled && sceneRef.current && !frameRef.current) {
      // Resume animation if scene exists but animation stopped
      animate();
    } else if (!isEnabled) {
      // Clean up everything when particles are disabled
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = undefined;
      }

      if (rendererRef.current) {
        if (
          mountRef.current &&
          mountRef.current.contains(rendererRef.current.domElement)
        ) {
          mountRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current.dispose();
        rendererRef.current = undefined;
      }

      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = undefined;
      }

      particlesRef.current = undefined;
      linesRef.current = undefined;
      cameraRef.current = undefined;
    }
  }, [isEnabled, animate, initScene]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "transparent",
      }}
    />
  );
}
