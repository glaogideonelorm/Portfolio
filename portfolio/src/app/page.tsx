"use client";

import { useState, useEffect } from "react";
import IntroAnimation from "@/components/animations/IntroAnimation";
import { motion } from "framer-motion";
import { useDevMode } from "@/context/DevModeContext";
import { Github, Linkedin, Mail, MessageSquare, Plus } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import DevModeToggle from "@/components/ui/DevModeToggle";
import AuthModal from "@/components/ui/AuthModal";
import BubbleCarousel from "@/components/ui/BubbleCarousel";
import SpotifyNowPlaying from "@/components/ui/SpotifyNowPlaying";
import {
  FaGamepad,
  FaBook,
  FaMusic,
  FaCode,
  FaRobot,
  FaBrain,
  FaCamera,
  FaUtensils,
} from "react-icons/fa";
import RotatingText from "@/components/animations/RotatingText";
import CustomCursor from "@/components/ui/CustomCursor";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

const hobbies = [
  {
    id: "gaming",
    title: "Gaming",
    description: "PUBG Mobile enthusiast, always up for a match!",
    icon: <FaGamepad className="text-2xl" />,
  },
  {
    id: "reading",
    title: "Reading",
    description:
      'Currently reading: "The Pragmatic Programmer" and "Clean Code"',
    icon: <FaBook className="text-2xl" />,
  },
  {
    id: "music",
    title: "Music",
    description: "Check out what I'm listening to!",
    icon: <FaMusic className="text-2xl" />,
  },
  {
    id: "photography",
    title: "Photography",
    description: "Capturing moments through my lens",
    icon: <FaCamera className="text-2xl" />,
  },
  {
    id: "cooking",
    title: "Cooking",
    description: "Experimenting with new recipes",
    icon: <FaUtensils className="text-2xl" />,
  },
];

const learningGoals = [
  {
    id: "ai",
    title: "AI/ML",
    description: "Exploring machine learning and AI applications",
    icon: <FaBrain className="text-2xl" />,
  },
  {
    id: "blockchain",
    title: "Blockchain",
    description: "Understanding Web3 and smart contracts",
    icon: <FaCode className="text-2xl" />,
  },
  {
    id: "cloud",
    title: "Cloud Architecture",
    description: "Mastering cloud-native development",
    icon: <FaCode className="text-2xl rotate-90" />,
  },
  {
    id: "mobile",
    title: "Mobile Dev",
    description: "Building cross-platform mobile apps",
    icon: <FaCode className="text-2xl" />,
  },
  {
    id: "security",
    title: "Cybersecurity",
    description: "Learning about application security",
    icon: <FaCode className="text-2xl" />,
  },
];

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [spotifyMessage, setSpotifyMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { isDevMode } = useDevMode();

  // Check for Spotify auth messages in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const spotifySuccess = urlParams.get("spotify_success");
    const spotifyError = urlParams.get("spotify_error");

    if (spotifySuccess) {
      setSpotifyMessage({
        type: "success",
        text: "Spotify connected successfully! Check console for refresh token to add to .env.local",
      });
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
    } else if (spotifyError) {
      let errorText = "Failed to connect Spotify";
      if (spotifyError === "missing_code") {
        errorText = "Authorization cancelled or failed";
      } else if (spotifyError === "auth_failed") {
        errorText = "Authentication failed - check console for details";
      }
      setSpotifyMessage({
        type: "error",
        text: errorText,
      });
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
    }

    // Auto-hide message after 10 seconds
    if (spotifySuccess || spotifyError) {
      setTimeout(() => setSpotifyMessage(null), 10000);
    }
  }, []);

  // Magnetic effect refs
  const heroRef = useMagneticEffect(0.2);
  const socialRef = useMagneticEffect(0.4);
  const projectRef = useMagneticEffect(0.3);
  const skillRef = useMagneticEffect(0.25);
  const aiAssistantRef = useMagneticEffect(0.5);

  return (
    <main className="min-h-screen relative cursor-none">
      <CustomCursor />
      <IntroAnimation onComplete={() => setIntroComplete(true)} />
      <AuthModal />

      {/* Spotify Message Notification */}
      {spotifyMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg max-w-md ${
            spotifyMessage.type === "success"
              ? "bg-green-900/90 text-green-100 border border-green-700"
              : "bg-red-900/90 text-red-100 border border-red-700"
          } backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">{spotifyMessage.text}</p>
            <button
              onClick={() => setSpotifyMessage(null)}
              className="ml-4 text-current opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      {/* Header with toggles */}
      <header className="fixed top-0 right-0 p-4 flex gap-2 z-40">
        <ThemeToggle />
        <DevModeToggle />
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        {/* Vision Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Turning Vision Into Reality
              </h2>
              <RotatingText />
            </motion.div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <motion.div
            ref={heroRef as any}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6 cursor-hover"
            whileHover={{ scale: 1.02 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gradient">
              Hello, I'm Gideon Glago
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-2xl mx-auto">
              Software Developer & Problem Solver
            </p>

            {/* Social Links */}
            <div className="flex gap-6 justify-center mt-8">
              <motion.a
                ref={socialRef as any}
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-white dark:text-white light:text-gray-800 hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-600 transition-all duration-300 cursor-hover p-2 rounded-full hover:bg-white/10"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-white dark:text-white light:text-gray-800 hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-600 transition-all duration-300 cursor-hover p-2 rounded-full hover:bg-white/10"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:your.email@example.com"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-white dark:text-white light:text-gray-800 hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-600 transition-all duration-300 cursor-hover p-2 rounded-full hover:bg-white/10"
              >
                <Mail size={24} />
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-20" id="about">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
              About Me
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6">
              I am a passionate software developer with expertise in building
              modern web applications. My focus is on creating intuitive and
              performant solutions that solve real-world problems.
            </p>
            <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-700">
              With a deep interest in AI and machine learning, I'm constantly
              exploring new ways to integrate intelligent features into
              applications.
            </p>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="py-20" id="projects">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                Featured Projects
              </h2>
              {isDevMode && (
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-white hover:opacity-90 transition-all duration-300 cursor-hover"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={20} />
                  Add Project
                </motion.button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project cards will go here */}
              <motion.div
                ref={projectRef as any}
                className="chat-bubble cursor-hover"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-white light:text-gray-800">
                  Project 1
                </h3>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600">
                  Description of project 1
                </p>
              </motion.div>
              <motion.div
                className="chat-bubble cursor-hover"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-white dark:text-white light:text-gray-800">
                  Project 2
                </h3>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600">
                  Description of project 2
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="py-20" id="skills">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Skill categories */}
              <motion.div
                ref={skillRef as any}
                className="chat-bubble cursor-hover"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white dark:text-white light:text-gray-800">
                  Frontend
                </h3>
                <ul className="space-y-2 text-gray-300 dark:text-gray-300 light:text-gray-600">
                  <li>React.js / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Framer Motion</li>
                </ul>
              </motion.div>
              <motion.div
                className="chat-bubble cursor-hover"
                whileHover={{ scale: 1.05, rotateY: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white dark:text-white light:text-gray-800">
                  Backend
                </h3>
                <ul className="space-y-2 text-gray-300 dark:text-gray-300 light:text-gray-600">
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>Java</li>
                  <li>SQL / NoSQL</li>
                </ul>
              </motion.div>
              <motion.div
                className="chat-bubble cursor-hover"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white dark:text-white light:text-gray-800">
                  Tools & Others
                </h3>
                <ul className="space-y-2 text-gray-300 dark:text-gray-300 light:text-gray-600">
                  <li>Git</li>
                  <li>Docker</li>
                  <li>AWS</li>
                  <li>CI/CD</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Beyond Coding Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
              Beyond Coding
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Hobbies */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-center mb-8 text-white dark:text-white light:text-gray-800">
                  Hobbies
                </h3>
                <BubbleCarousel items={hobbies} />

                {/* Spotify Integration */}
                <div className="mt-8">
                  <h4 className="text-xl font-medium mb-4 text-white dark:text-white light:text-gray-800">
                    Currently Playing
                  </h4>
                  <SpotifyNowPlaying />
                </div>
              </div>

              {/* Learning Goals */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-center mb-8 text-white dark:text-white light:text-gray-800">
                  Learning Goals
                </h3>
                <BubbleCarousel items={learningGoals} />
              </div>
            </div>
          </div>
        </section>

        {/* AI Assistant Chat Bubble */}
        <div className="fixed bottom-8 right-8 z-50">
          <motion.div
            ref={aiAssistantRef as any}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
            className="relative group"
          >
            <motion.button
              onClick={() => {
                /* Handle chat open */
              }}
              className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 
                       rounded-full flex items-center justify-center shadow-lg
                       hover:shadow-xl transition-all duration-300 cursor-hover"
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRobot className="text-2xl text-white" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="absolute bottom-full right-0 mb-4 bg-white dark:bg-gray-800 light:bg-white
                       rounded-lg p-4 shadow-xl w-64 transform origin-bottom-right"
            >
              <p className="text-sm font-medium text-gray-800 dark:text-white light:text-gray-800">
                👋 Hey there! I'm your AI assistant.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300 light:text-gray-600 mt-2">
                Click to chat with me! I can help you explore my projects,
                skills, and more.
              </p>
              <div
                className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45
                            w-4 h-4 bg-white dark:bg-gray-800 light:bg-white"
              ></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
