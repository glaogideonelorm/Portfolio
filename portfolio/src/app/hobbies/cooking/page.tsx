"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChefHat, Flame, Clock, Heart, Users } from "lucide-react";
import { FaUtensils } from "react-icons/fa";
import CustomCursor from "@/components/ui/CustomCursor";

export default function CookingPage() {
  const favoriteRecipes = [
    {
      name: "Jollof Rice",
      origin: "Nigerian",
      difficulty: "Medium",
      time: "45 mins",
      description:
        "A fragrant, perfectly spiced one-pot dish that brings the taste of home",
      specialty: "Weekend Family Dinners",
    },
    {
      name: "Aglio e Olio",
      origin: "Italian",
      difficulty: "Easy",
      time: "15 mins",
      description:
        "Simple pasta with garlic, olive oil, and chili - perfect late-night coding fuel",
      specialty: "Quick Developer Meals",
    },
    {
      name: "Thai Green Curry",
      origin: "Thai",
      difficulty: "Hard",
      time: "60 mins",
      description:
        "Complex flavors from scratch - a weekend adventure in taste",
      specialty: "Experimental Sundays",
    },
    {
      name: "Sourdough Bread",
      origin: "European",
      difficulty: "Hard",
      time: "3 days",
      description:
        "The ultimate patience project - like debugging but delicious",
      specialty: "Lockdown Hobby",
    },
  ];

  const cookingPrinciples = [
    {
      title: "Fresh Ingredients First",
      description:
        "Like clean code, great cooking starts with quality ingredients",
      icon: <Heart className="w-8 h-8" />,
    },
    {
      title: "Taste as You Go",
      description:
        "Just like testing code, constant tasting ensures the final product is perfect",
      icon: <ChefHat className="w-8 h-8" />,
    },
    {
      title: "Learn From Mistakes",
      description:
        "Every burnt dish teaches something - debugging applies to cooking too",
      icon: <Flame className="w-8 h-8" />,
    },
  ];

  const cookingStats = [
    {
      label: "Recipes Mastered",
      value: "50+",
      icon: <ChefHat className="w-6 h-6" />,
    },
    {
      label: "Cuisines Explored",
      value: "12",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Kitchen Experiments",
      value: "200+",
      icon: <Flame className="w-6 h-6" />,
    },
    {
      label: "Happy Taste Testers",
      value: "∞",
      icon: <Heart className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-50 dark:from-orange-900 dark:via-red-900 dark:to-yellow-900 cursor-none">
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-6">
            <FaUtensils className="text-3xl text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            Culinary <span className="text-gradient">Adventures</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Where creativity meets nutrition, and every recipe tells a story of
            culture, experimentation, and love.
          </p>
        </motion.div>

        {/* Cooking Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              From Code to Kitchen
            </h2>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Cooking became my creative outlet during university—a way to
                decompress from coding sessions and connect with my cultural
                roots. What started as survival skills quickly evolved into a
                passion for understanding flavors, techniques, and the science
                behind great food.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I love how cooking parallels programming: you follow a recipe
                (algorithm), adjust for variables (ingredients, equipment,
                environment), debug when things go wrong, and iterate until you
                achieve the perfect result. Both require patience, precision,
                and creativity.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                My kitchen is my second laboratory—where I experiment with
                fusion cuisines, recreate childhood memories, and create new
                experiences to share with friends and family.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Cooking Stats
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {cookingStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                >
                  <div className="text-primary mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4 mt-8">
              <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                My Kitchen Philosophy
              </h4>
              <div className="space-y-4">
                {cookingPrinciples.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-primary mt-1">{principle.icon}</div>
                      <div>
                        <h5 className="font-bold text-gray-800 dark:text-white mb-1">
                          {principle.title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Signature Recipes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
            Signature Dishes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {favoriteRecipes.map((recipe, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white/90 dark:bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                      {recipe.name}
                    </h4>
                    <p className="text-primary font-semibold text-sm">
                      {recipe.origin} Cuisine
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <Clock className="w-4 h-4" />
                      {recipe.time}
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        recipe.difficulty === "Easy"
                          ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : recipe.difficulty === "Medium"
                          ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {recipe.difficulty}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {recipe.description}
                </p>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Perfect for:
                    </span>
                    <span className="text-sm text-gray-800 dark:text-white">
                      {recipe.specialty}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cooking Journey */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">
            Culinary Evolution
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-white/90 to-white/70 dark:from-white/10 dark:to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                University Survival
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Started with instant noodles and basic rice dishes. Every meal
                was a budget-conscious experiment.
              </p>
            </div>

            <div className="bg-gradient-to-b from-white/90 to-white/70 dark:from-white/10 dark:to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Cultural Exploration
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Discovered YouTube cooking channels and started recreating
                dishes from different cultures.
              </p>
            </div>

            <div className="bg-gradient-to-b from-white/90 to-white/70 dark:from-white/10 dark:to-white/5 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                Innovation Phase
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Now creating fusion recipes and hosting dinner parties. Cooking
                has become an art form.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-lg p-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Let's Cook Together
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Always eager to learn new recipes, share cooking tips, or host a
            dinner party. If you have a family recipe you'd like to share or
            want to collaborate on a cooking experiment, let's turn up the heat
            in the kitchen!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all"
            >
              Share a Recipe
            </motion.button>
            <Link href="/#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-orange-300 dark:border-orange-600 rounded-lg text-gray-800 dark:text-white font-semibold hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all"
              >
                Dinner Party Invite?
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
