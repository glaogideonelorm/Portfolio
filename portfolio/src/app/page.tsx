"use client";

import { useState, useEffect } from "react";
import IntroAnimation from "@/components/animations/IntroAnimation";
import { motion } from "framer-motion";
import { useDevMode } from "@/context/DevModeContext";
import {
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Plus,
  Globe,
  Phone,
} from "lucide-react";
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
import SkillsShowcase from "@/components/ui/SkillsShowcase";

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
                href="https://github.com/glaogideonelorm"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="text-white dark:text-white light:text-gray-800 hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-600 transition-all duration-300 cursor-hover p-2 rounded-full hover:bg-white/10"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/glagogideon/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="text-white dark:text-white light:text-gray-800 hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-600 transition-all duration-300 cursor-hover p-2 rounded-full hover:bg-white/10"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:glagogideonelorm2006@gmail.com"
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
              I'm a Computer Science graduate from the University of Ghana with
              a passion for cybersecurity and full-stack development. My journey
              began with competitive programming and evolved into comprehensive
              expertise in building secure, scalable applications that solve
              real-world problems across the African tech ecosystem.
            </p>
            <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-700 mb-6">
              As a cybersecurity enthusiast, I've competed in national
              championships, placing 4th in Ghana's National Cybersecurity
              Championship and completing advanced penetration testing tracks.
              This unique background allows me to build applications with
              security-first thinking, ensuring robust and trustworthy
              solutions.
            </p>
            <p className="text-lg text-gray-300 dark:text-gray-300 light:text-gray-700">
              Today, I focus on integrating AI/ML capabilities into traditional
              applications, bridging the gap between cutting-edge technology and
              practical business solutions. I'm particularly interested in how
              emerging technologies can drive innovation across African markets
              and am always open to collaborating on projects that make a
              meaningful impact.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Featured Projects */}
              <motion.div
                ref={projectRef as any}
                className="chat-bubble cursor-hover group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800">
                    Portfolio Website
                  </h3>
                </div>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 mb-4">
                  This very portfolio! Built with Next.js 15, TypeScript,
                  Tailwind CSS, and Framer Motion. Features Spotify integration,
                  custom animations, and responsive design.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                    TypeScript
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                    Next.js
                  </span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                    Framer Motion
                  </span>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/glaogideonelorm/Portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github size={16} className="inline mr-1" />
                    Code
                  </a>
                  <span className="text-green-400">
                    <Globe size={16} className="inline mr-1" />
                    Live
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="chat-bubble cursor-hover group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800">
                    Spotify Album Manager
                  </h3>
                </div>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 mb-4">
                  Python application for managing Spotify playlists and albums.
                  Demonstrates API integration and music data manipulation with
                  clean, maintainable code.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">
                    Python
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                    Spotify API
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                    Data Processing
                  </span>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/glaogideonelorm/SpotifyAlbum"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github size={16} className="inline mr-1" />
                    Code
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="chat-bubble cursor-hover group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800">
                    Email Spam Checker
                  </h3>
                </div>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 mb-4">
                  JavaScript-based email spam detection system using machine
                  learning algorithms. Features real-time analysis and
                  cybersecurity-focused threat detection.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">
                    JavaScript
                  </span>
                  <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">
                    ML
                  </span>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded">
                    Cybersecurity
                  </span>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/telexintegrations/Email-spam-checker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github size={16} className="inline mr-1" />
                    Code
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="chat-bubble cursor-hover group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800">
                    FastAPI Book Project
                  </h3>
                </div>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 mb-4">
                  RESTful API built with FastAPI for book management system.
                  Part of HNG12 DevOps x Backend internship demonstrating modern
                  Python web development practices.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">
                    Python
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                    FastAPI
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                    REST API
                  </span>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/glaogideonelorm/fastapi-book-project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github size={16} className="inline mr-1" />
                    Code
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="chat-bubble cursor-hover group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800">
                    HNG Internship Projects
                  </h3>
                </div>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 mb-4">
                  Collection of projects from HNG12 intensive internship
                  program. Covers full-stack development, DevOps practices, and
                  collaborative software engineering.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">
                    JavaScript
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                    Full-Stack
                  </span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                    DevOps
                  </span>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/glaogideonelorm/HNG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github size={16} className="inline mr-1" />
                    Code
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="chat-bubble cursor-hover group"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-xl font-semibold text-white dark:text-white light:text-gray-800">
                    Personal Projects Hub
                  </h3>
                </div>
                <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 mb-4">
                  Repository containing various personal coding experiments,
                  algorithms, and small applications. Showcases problem-solving
                  skills and continuous learning journey.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded">
                    Various
                  </span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                    Algorithms
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                    Experiments
                  </span>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/glaogideonelorm/Personal-Projects"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github size={16} className="inline mr-1" />
                    Code
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="py-20" id="skills">
          <div className="max-w-7xl mx-auto px-4">
            <SkillsShowcase />
          </div>
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

        {/* Contact Section */}
        <section className="py-20" id="contact">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Always open to discussing new opportunities, collaborating on
              interesting projects, or just having a conversation about
              technology and innovation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <motion.a
                href="mailto:glagogideonelorm2006@gmail.com"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 cursor-hover border border-white/10"
              >
                <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300">glagogideonelorm2006@gmail.com</p>
              </motion.a>

              <motion.a
                href="tel:+233530686764"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 cursor-hover border border-white/10"
              >
                <Phone className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300">+233 530 686 764</p>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/glagogideon/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 cursor-hover border border-white/10"
              >
                <Linkedin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
                <p className="text-gray-300">Professional Network</p>
              </motion.a>

              <motion.a
                href="https://github.com/glaogideonelorm"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 cursor-hover border border-white/10"
              >
                <Github className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">GitHub</h3>
                <p className="text-gray-300">Code Repository</p>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Based in Ghana 🇬🇭
              </h3>
              <p className="text-gray-300 mb-6">
                Computer Science graduate from University of Ghana with
                expertise in cybersecurity, full-stack development, and AI
                integration. Available for remote collaboration and open to
                relocation opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white">
                  Full-Stack Development
                </span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white">
                  Cybersecurity
                </span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white">
                  AI/ML Integration
                </span>
                <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white">
                  Remote Ready
                </span>
              </div>
            </motion.div>
          </motion.div>
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
