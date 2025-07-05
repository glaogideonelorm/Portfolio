"use client";
/* eslint-disable react/no-unescaped-entities */

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Gamepad2, Trophy, Users, Target } from "lucide-react";
import { FaGamepad } from "react-icons/fa";
import CustomCursor from "@/components/ui/CustomCursor";

export default function GamingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 cursor-none">
      <CustomCursor />

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link
          href="/"
          className="inline-flex items-center text-white hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Portfolio
        </Link>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-6">
            <FaGamepad className="text-3xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Gaming <span className="text-gradient">Passion</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Where strategy meets reflexes, and every match tells a story of
            growth, teamwork, and epic moments.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              My Gaming Journey
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed">
                It all started during university when my friends introduced me
                to PUBG Mobile. What began as casual entertainment quickly
                evolved into a serious passion for competitive gaming and
                strategic thinking.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                The thrill of dropping into Erangel, the tactical decisions in
                Sanhok, and the intense final circles in Miramar taught me more
                than just gaming skills—they taught me patience, quick
                decision-making, and the importance of teamwork under pressure.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Every match is a new learning experience, whether it's mastering
                recoil patterns, perfecting movement mechanics, or developing
                game sense that can only come from thousands of hours of
                dedication.
              </p>
            </div>
          </motion.div>

          {/* Stats & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Gaming Stats & Achievements
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">Crown</div>
                <div className="text-gray-400 text-sm">Highest Tier</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <Target className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2.8 K/D</div>
                <div className="text-gray-400 text-sm">Season Best</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">Squad</div>
                <div className="text-gray-400 text-sm">Preferred Mode</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <Gamepad2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2000+</div>
                <div className="text-gray-400 text-sm">Hours Played</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Favorite Aspects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            What I Love Most
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Team Strategy
              </h4>
              <p className="text-gray-300">
                Coordinating with teammates, planning rotations, and executing
                complex strategies under pressure.
              </p>
            </div>

            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Skill Development
              </h4>
              <p className="text-gray-300">
                Constantly improving aim, movement, and game sense through
                practice and analysis.
              </p>
            </div>

            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Competitive Spirit
              </h4>
              <p className="text-gray-300">
                The adrenaline rush of clutch moments and the satisfaction of
                climbing ranks.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm rounded-lg p-12"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Want to Team Up?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Always looking for skilled teammates for ranked matches. If you're
            passionate about tactical gameplay and teamwork, let's drop in
            together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            >
              Add Me on PUBG
            </motion.button>
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/10 transition-all"
              >
                Get In Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
