"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDevMode } from "@/context/DevModeContext";

const Header = () => {
  const { isDev, enableDev, disableDev } = useDevMode();

  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleToggle = () => {
    if (isDev) {
      disableDev();
    } else {
      const username = window.prompt("Enter dev username");
      if (!username) return;
      const password = window.prompt("Enter dev password");
      if (!password) return;
      enableDev({ username, password });
    }
  };

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#assistant", label: "AI Assistant" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 transition-colors">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Brand */}
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-white/80 hover:text-blue-500 transition-colors font-medium"
            >
              {item.label}
              <motion.span
                layoutId="underline"
                className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left scale-x-0 hover:scale-x-100 transition-transform"
              />
            </Link>
          ))}

          {/* Dev toggle */}
          <button
            onClick={handleToggle}
            className={`ml-6 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${
              isDev
                ? "bg-green-600 text-white border-green-700 hover:bg-green-700"
                : "bg-white/20 text-white hover:bg-blue-500 border-white/30"
            }`}
            title="Toggle developer mode"
          >
            {isDev ? "Dev" : "User"}
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-gray-900/80 backdrop-blur-md py-3"
        >
          <nav className="container mx-auto flex flex-col space-y-4 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white text-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={() => {
                handleToggle();
                setMenuOpen(false);
              }}
              className={`self-start px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${
                isDev
                  ? "bg-green-600 text-white border-green-700 hover:bg-green-700"
                  : "bg-white/20 text-white hover:bg-blue-500 border-white/30"
              }`}
            >
              {isDev ? "Dev" : "User"}
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
