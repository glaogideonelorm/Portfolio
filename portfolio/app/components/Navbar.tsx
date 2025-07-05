"use client";
import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      style={{
        padding: "0.5rem 1rem",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: "none",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      {/* Left side: Theme toggle */}
      <div>
        <ThemeToggle />
      </div>

      {/* Right side: Vertical links */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.5rem",
        }}
      >
        <Link
          href="#home"
          className="text-sm py-1 text-muted-foreground hover-effect lowercase"
        >
          home
        </Link>
        <Link
          href="#about"
          className="text-sm py-1 hover-effect text-foreground font-medium lowercase"
        >
          about
        </Link>
        <Link
          href="#projects"
          className="text-sm py-1 text-muted-foreground hover-effect lowercase"
        >
          projects
        </Link>
        <Link
          href="#ideas"
          className="text-sm py-1 text-muted-foreground hover-effect lowercase"
        >
          ideas
        </Link>
        <Link
          href="#thoughts"
          className="text-sm py-1 text-muted-foreground hover-effect lowercase"
        >
          thoughts
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
