import { Code2, LogOut } from "lucide-react";
import { useDevMode } from "@/context/DevModeContext";

export default function DevModeToggle() {
  const { isDevMode, toggleAuthModal, logout } = useDevMode();

  return (
    <button
      onClick={isDevMode ? logout : toggleAuthModal}
      className="p-2 rounded-full hover:bg-gray-800 transition-all duration-300 cursor-hover hover:scale-110 hover:rotate-12"
      aria-label={isDevMode ? "Exit developer mode" : "Enter developer mode"}
    >
      {isDevMode ? (
        <LogOut className="w-5 h-5 text-red-400" />
      ) : (
        <Code2 className="w-5 h-5 text-blue-400" />
      )}
    </button>
  );
}
