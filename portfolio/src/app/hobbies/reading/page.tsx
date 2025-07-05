"use client";
/* eslint-disable react/no-unescaped-entities */

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, Star, Clock, Heart } from "lucide-react";
import { FaBook } from "react-icons/fa";
import CustomCursor from "@/components/ui/CustomCursor";

export default function ReadingPage() {
  const currentBooks = [
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      progress: 65,
      rating: 5,
      thoughts: "Revolutionary approach to software development thinking",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      progress: 40,
      rating: 5,
      thoughts: "Essential for writing maintainable, readable code",
    },
  ];

  const favoriteBooks = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Development",
      impact:
        "Changed my entire approach to building positive habits and systems",
    },
    {
      title: "The Psychology of Programming",
      author: "Gerald M. Weinberg",
      genre: "Tech",
      impact: "Opened my eyes to the human side of software development",
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      genre: "Productivity",
      impact: "Revolutionized how I approach focused, meaningful work",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-black dark:to-gray-800 cursor-none">
      <CustomCursor />

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link
          href="/"
          className="inline-flex items-center text-gray-800 dark:text-white hover:text-primary transition-colors"
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mb-6">
            <FaBook className="text-3xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            Reading <span className="text-gradient">Journey</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Where knowledge meets curiosity, and every page turns into wisdom
            for both code and life.
          </p>
        </motion.div>

        {/* Currently Reading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
            Currently Reading
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentBooks.map((book, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex">
                    {[...Array(book.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {book.progress}%
                    </div>
                    <div className="text-sm text-gray-500">Progress</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  by {book.author}
                </p>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${book.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                  />
                </div>

                <p className="text-gray-600 dark:text-gray-400 italic">
                  "{book.thoughts}"
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reading Philosophy */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Why I Read
            </h2>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Reading isn't just a hobby for me—it's a gateway to continuous
                learning and personal growth. In the rapidly evolving world of
                technology, staying curious and learning from the experiences of
                others is essential.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm particularly drawn to books that bridge the gap between
                technical excellence and human psychology. Understanding not
                just how to write code, but why certain approaches work and how
                to think like a problem solver.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Every book teaches me something new—whether it's a technical
                concept, a different perspective on productivity, or insights
                into human behavior that make me a better developer and person.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Reading Goals 2024
            </h3>

            <div className="space-y-4">
              <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-800 dark:text-white font-semibold">
                    Books Read
                  </span>
                  <span className="text-2xl font-bold text-primary">18/24</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <BookOpen className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    12
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tech Books
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    6
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Self-Dev
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Favorite Books */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
            Books That Changed Me
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {favoriteBooks.map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-gradient-to-b from-white/90 to-white/70 dark:from-white/10 dark:to-white/5 backdrop-blur-sm rounded-lg p-8"
              >
                <div className="text-center mb-4">
                  <div className="inline-block px-3 py-1 bg-primary/20 rounded-full text-primary text-sm font-semibold mb-4">
                    {book.genre}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {book.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    by {book.author}
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-center italic">
                  "{book.impact}"
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reading Habits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-lg p-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            My Reading Rituals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-primary mb-4" />
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                Morning Reading
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                30 minutes every morning with coffee, focusing on technical
                books
              </p>
            </div>

            <div className="flex flex-col items-center">
              <BookOpen className="w-12 h-12 text-secondary mb-4" />
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                Note Taking
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Digital highlights and notes for future reference and review
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Heart className="w-12 h-12 text-red-500 mb-4" />
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                Implementation
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Applying lessons learned immediately in projects and daily life
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
              >
                Book Recommendations?
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
