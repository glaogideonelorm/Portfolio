"use client";
/* eslint-disable react/no-unescaped-entities */

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Eye,
  Aperture,
  Sun,
  Moon,
  MapPin,
} from "lucide-react";
import { FaCamera } from "react-icons/fa";
import CustomCursor from "@/components/ui/CustomCursor";

export default function PhotographyPage() {
  const photoTypes = [
    {
      name: "Street Photography",
      description: "Capturing authentic moments in urban environments",
      count: "200+",
      icon: <MapPin className="w-6 h-6" />,
      color: "from-gray-600 to-gray-800",
    },
    {
      name: "Golden Hour",
      description: "Chasing that perfect natural lighting",
      count: "150+",
      icon: <Sun className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "Night Photography",
      description: "Finding beauty in darkness and city lights",
      count: "80+",
      icon: <Moon className="w-6 h-6" />,
      color: "from-blue-800 to-purple-900",
    },
    {
      name: "Portraits",
      description: "Telling stories through human expressions",
      count: "120+",
      icon: <Eye className="w-6 h-6" />,
      color: "from-pink-500 to-rose-600",
    },
  ];

  const gear = [
    {
      item: "Canon EOS R6",
      type: "Primary Camera",
      usage: "Everyday photography and video",
    },
    {
      item: "50mm f/1.8",
      type: "Portrait Lens",
      usage: "Street portraits and low light",
    },
    {
      item: "24-70mm f/2.8",
      type: "Versatile Zoom",
      usage: "Travel and general photography",
    },
    {
      item: "Peak Design Strap",
      type: "Accessory",
      usage: "Comfort during long shoots",
    },
  ];

  const photographyPrinciples = [
    {
      title: "Moment Over Setup",
      description:
        "I prefer capturing authentic, candid moments rather than heavily staged compositions.",
      icon: <Camera className="w-8 h-8" />,
    },
    {
      title: "Light Chaser",
      description:
        "Always seeking interesting light—whether it's golden hour magic or dramatic shadows.",
      icon: <Sun className="w-8 h-8" />,
    },
    {
      title: "Story First",
      description:
        "Every photo should tell a story or evoke an emotion, technique comes second.",
      icon: <Eye className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-black cursor-none">
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full mb-6">
            <FaCamera className="text-3xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Visual <span className="text-gradient">Stories</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Capturing fleeting moments and finding extraordinary beauty in
            ordinary scenes.
          </p>
        </motion.div>

        {/* Photography Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              Behind the Lens
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed">
                Photography started as a way to document my travels and
                experiences, but it quickly became a form of meditation and
                artistic expression. There's something magical about freezing a
                moment in time that will never exist again.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                I'm drawn to authentic moments—the split second when light hits
                a building just right, or when someone's expression tells a
                complete story. My camera has taught me to see the world more
                intentionally and appreciate the beauty in everyday scenes.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Like coding, photography is about problem-solving: managing
                light, composition, timing, and technical settings to create
                something meaningful from raw elements.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">My Approach</h3>

            <div className="space-y-6">
              {photographyPrinciples.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-primary mt-1">{principle.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">
                        {principle.title}
                      </h4>
                      <p className="text-gray-300">{principle.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Photo Categories */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Captured Moments
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {photoTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="relative group cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-80 group-hover:opacity-90 transition-opacity rounded-lg`}
                />
                <div className="relative p-8 text-center group-hover:transform group-hover:scale-105 transition-all">
                  <div className="text-white mb-4 flex justify-center">
                    {type.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {type.name}
                  </h4>
                  <p className="text-gray-200 text-sm mb-4">
                    {type.description}
                  </p>
                  <div className="text-2xl font-bold text-white">
                    {type.count}
                  </div>
                  <div className="text-xs text-gray-300">Photos</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Gear */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Current Gear
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {gear.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-white">{item.item}</h4>
                  <Aperture className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-primary text-sm font-semibold mb-2">
                  {item.type}
                </div>
                <p className="text-gray-300 text-sm">{item.usage}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Photography Tips */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            What I've Learned
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Patience Pays Off
              </h4>
              <p className="text-gray-300">
                The best shots often come to those who wait for the right
                moment, light, or expression.
              </p>
            </div>

            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                Light is Everything
              </h4>
              <p className="text-gray-300">
                Understanding and chasing good light transforms ordinary
                subjects into extraordinary images.
              </p>
            </div>

            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                See Differently
              </h4>
              <p className="text-gray-300">
                Photography has trained me to notice details and perspectives
                that others might miss.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center bg-gradient-to-r from-slate-600/20 to-gray-700/20 backdrop-blur-sm rounded-lg p-12"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Let's Capture Moments
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Always looking for new locations to explore and interesting subjects
            to photograph. If you know of hidden gems or want to collaborate on
            a photo walk, I'd love to connect!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-slate-600 to-gray-700 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            >
              View Portfolio
            </motion.button>
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/20 rounded-lg text-white font-semibold hover:bg-white/10 transition-all"
              >
                Photo Collaboration?
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
