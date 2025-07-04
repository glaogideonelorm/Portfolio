"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface DevModeContextValue {
  isDevMode: boolean;
  showAuthModal: boolean;
  authError: string | null;
  toggleAuthModal: () => void;
  authenticate: (username: string, password: string) => void;
  logout: () => void;
}

const DevModeContext = createContext<DevModeContextValue | undefined>(
  undefined
);

const CREDENTIALS = {
  username: "Gideon",
  password: "Pw123rat!",
};

export const DevModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDevMode, setIsDevMode] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Load dev mode state from localStorage, default to user mode
    const savedMode = localStorage.getItem("devMode");
    if (savedMode === "true") {
      // Only show auth modal if explicitly trying to access dev mode
      setShowAuthModal(true);
    } else {
      setIsDevMode(false);
      localStorage.setItem("devMode", "false");
    }
  }, []);

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
    setAuthError(null);
  };

  const authenticate = (username: string, password: string) => {
    if (
      username === CREDENTIALS.username &&
      password === CREDENTIALS.password
    ) {
      setIsDevMode(true);
      setShowAuthModal(false);
      setAuthError(null);
      localStorage.setItem("devMode", "true");
    } else {
      setAuthError("Invalid credentials");
    }
  };

  const logout = () => {
    setIsDevMode(false);
    localStorage.removeItem("devMode");
  };

  return (
    <DevModeContext.Provider
      value={{
        isDevMode,
        showAuthModal,
        authError,
        toggleAuthModal,
        authenticate,
        logout,
      }}
    >
      {children}
    </DevModeContext.Provider>
  );
};

export function useDevMode() {
  const ctx = useContext(DevModeContext);
  if (!ctx) throw new Error("useDevMode must be used within DevModeProvider");
  return ctx;
}
