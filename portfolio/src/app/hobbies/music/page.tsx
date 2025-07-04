"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Music, Headphones, Radio, Heart } from "lucide-react";
import { FaMusic, FaSpotify } from "react-icons/fa";
import SpotifyNowPlaying from "@/components/ui/SpotifyNowPlaying";
import CustomCursor from "@/components/ui/CustomCursor";

export default function MusicPage() {
  const favoriteGenres = [
    {
      name: "Lo-Fi Hip Hop",
      description: "Perfect coding companion",
      mood: "Focus & Flow",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Electronic",
      description: "Energy for late-night sessions",
      mood: "Productive",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Afrobeats",
      description: "Cultural roots and rhythm",
      mood: "Joyful",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Jazz",
      description: "Sophisticated problem-solving",
      mood: "Contemplative",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const codingPlaylists = [
    {
      name: "Deep Focus",
      tracks: 127,
      duration: "8h 43m",
      description: "Instrumental beats for maximum concentration",
    },
    {
      name: "Debug Sessions",
      tracks: 89,
      duration: "5h 12m",
      description: "Calm vibes when hunting down bugs",
    },
    {
      name: "Creative Flow",
      tracks: 156,
      duration: "10h 21m",
      description: "Inspiring melodies for building new features",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 cursor-none">
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <FaMusic className="text-3xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Musical <span className="text-gradient">Journey</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Where melody meets code, and every beat synchronizes with my
            creative process.
          </p>
        </motion.div>

        {/* Current Listening */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Currently Vibing To
          </h2>
          <div className="max-w-2xl mx-auto">
            <SpotifyNowPlaying />
          </div>

          <div className="text-center mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-spotify text-white px-6 py-3 rounded-full font-semibold"
            >
              <FaSpotify className="text-xl" />
              <span>Follow my playlists on Spotify</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Music & Coding Connection */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Music & Code</h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed">
                Music isn't just background noise when I code—it's an essential
                part of my development process. Different genres trigger
                different mental states, helping me tackle various types of
                challenges.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Lo-fi beats create a steady rhythm that matches methodical
                debugging, while upbeat electronic music energizes me during
                feature development. The right soundtrack can turn a complex
                algorithm into a dance of logic and creativity.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                I've discovered that certain songs become associated with
                breakthrough moments in projects, creating a personal library of
                "victory tracks" that remind me of solved problems and
                successful deployments.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">
              Coding Playlists
            </h3>

            <div className="space-y-4">
              {codingPlaylists.map((playlist, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-white">
                      {playlist.name}
                    </h4>
                    <Headphones className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span>{playlist.tracks} tracks</span>
                    <span>•</span>
                    <span>{playlist.duration}</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {playlist.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Favorite Genres */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Musical Spectrum
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteGenres.map((genre, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-20 group-hover:opacity-30 transition-opacity rounded-lg`}
                />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center group-hover:transform group-hover:scale-105 transition-all">
                  <Music className="w-8 h-8 text-white mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">
                    {genre.name}
                  </h4>
                  <p className="text-gray-300 text-sm mb-3">
                    {genre.description}
                  </p>
                  <div
                    className={`inline-block px-3 py-1 bg-gradient-to-r ${genre.color} rounded-full text-white text-xs font-semibold`}
                  >
                    {genre.mood}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Music Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Why Music Matters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Radio className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Mental State
              </h4>
              <p className="text-gray-300">
                Music is my mental switch—changing tracks changes my cognitive
                approach to problems.
              </p>
            </div>

            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">Flow State</h4>
              <p className="text-gray-300">
                The right rhythm creates a coding flow where hours feel like
                minutes and code flows naturally.
              </p>
            </div>

            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Cultural Connection
              </h4>
              <p className="text-gray-300">
                Music connects me to my roots while inspiring innovation in
                technology.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg p-12"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Let's Share Music
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Always curious about new music that could enhance my coding
            sessions. Got a track that puts you in the zone? I'd love to
            discover new sounds that could become part of my development
            soundtrack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-spotify rounded-lg text-white font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <FaSpotify />
              Follow on Spotify
            </motion.button>
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/10 transition-all"
              >
                Share a Track
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
